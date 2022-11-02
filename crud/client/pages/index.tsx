import { useEffect, useState } from "react";
import { Button, Container, Modal, Table } from "react-bootstrap";
import { deleteRequest, getRequest } from "../axios/requestConfig";
import { createEditModalProps, users } from "../types/users";
export default function Home() {
  const [users, setUsers] = useState<users[] | []>([]);

  const [createEditModalProps, setCreateEditModalProps] =
    useState<createEditModalProps>({
      open: false,
      type: "",
      user: null,
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
  const handleClose = () => {
    setCreateEditModalProps((prev) => ({ ...prev, open: false }));
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
            setCreateEditModalProps((prev) => ({
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
                    className="bi bi-trash"
                    onClick={() => deleteUser(data.id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Modal show={createEditModalProps.open} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {createEditModalProps.type === "create"
              ? "Create User"
              : "Edit User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
