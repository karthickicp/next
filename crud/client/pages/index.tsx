import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { deleteRequest, getRequest, postRequest } from "../axios/requestConfig";
import { createEditModalProps, users } from "../types/users";
import * as Yup from "yup";
import axios from "axios";
export default function Home() {
  const [users, setUsers] = useState<users[] | []>([]);
  const [createEditModal, setCreateEditModal] = useState<createEditModalProps>({
    open: false,
    type: "create",
    user: null,
  });
  const getInitialValues = () => {
    let initialValues: users = {
      first_name: "",
      last_name: "",
      email: "",
    };
    if (createEditModal.type !== "create" && createEditModal.user) {
      initialValues = {
        id: createEditModal.user?.id,
        first_name: createEditModal.user?.first_name,
        last_name: createEditModal.user?.last_name,
        email: createEditModal.user?.email,
      };
      return initialValues;
    }
    return initialValues;
  };

  const userValidationSchema = Yup.object({
    first_name: Yup.string().required("First name is requied"),
    last_name: Yup.string().required("Last name is requied"),
    email: Yup.string()
      .email("invalid email address")
      .required("Email is requied"),
  });

  const getUsers = async () => {
    try {
      let usersData = await getRequest("/users");
      setUsers(usersData);
    } catch (err) {
      console.error(err);
    }
  };
  const deleteUser = async (userId: number) => {
    let id = "";
    if (userId) {
      id = `id=${userId}`;
    }
    try {
      let deleteUser = await deleteRequest(`user/delete?${id}`);
      if (deleteUser.status === 200) {
        getUsers();
      }
    } catch (err) {
      console.error(err);
    }
  };
  const createUser = async (user: users) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}users/create`, {
        method: "POST",
        body: JSON.stringify(user),
      }).then((res) => {
        if (res.status === 200) {
          getUsers();
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateUser = async (userId: number, user: users) => {
    let id = "";
    if (userId) {
      id = `id=${userId}`;
    }
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}users/update?${id}`, {
        method: "PUT",
        body: JSON.stringify(user),
      }).then((res) => {
        if (res.status === 200) {
          getUsers();
        }
      });
    } catch (err) {
      console.error(err);
    }
  };
  const handleClose = () => {
    setCreateEditModal((prev) => ({ ...prev, open: false }));
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Container className="px-3">
      <div className="d-flex justify-content-between  my-3">
        <h4 className="mb-0">Users</h4>
        <Button
          onClick={() =>
            setCreateEditModal((prev) => ({
              ...prev,
              open: true,
              type: "create",
            }))
          }
        >
          create
        </Button>
      </div>
      {users && users.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((data: users, index: number) => (
              <tr key={data.id}>
                <td>{index + 1}</td>
                <td>{data.first_name}</td>
                <td>{data.last_name}</td>
                <td>{data.email}</td>
                <td>
                  <i
                    className="bi bi-trash me-3"
                    onClick={() => deleteUser(data.id)}
                  ></i>
                  <i
                    className="bi bi-pencil-fill"
                    onClick={() =>
                      setCreateEditModal((prev) => ({
                        ...prev,
                        open: true,
                        user: data,
                        type: "edit",
                      }))
                    }
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Modal show={createEditModal.open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {createEditModal.type === "create" ? "Create User" : "Edit User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={getInitialValues()}
            validationSchema={userValidationSchema}
            onSubmit={async (values) => {
              if (createEditModal.type === "create") {
                await createUser(values);
              } else {
                await updateUser(values.id, values);
              }
              handleClose();
            }}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              handleBlur,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      name="first_name"
                      value={values.first_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.first_name && errors && errors.first_name && (
                      <Form.Text className="text-danger">
                        {errors.first_name}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      name="last_name"
                      value={values.last_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.last_name && errors && errors.last_name && (
                      <Form.Text className="text-danger">
                        {errors.last_name}
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors && errors.email && (
                      <Form.Text className="text-danger">
                        {errors.email}
                      </Form.Text>
                    )}
                  </Form.Group>

                  <Button variant="primary" type="submit" className="me-3">
                    Submit
                  </Button>
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                </>
              </form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
