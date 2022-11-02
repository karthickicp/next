import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
interface users {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}
export default function Home() {
  const [users, setUsers] = useState<users[] | []>([]);
  useEffect(() => {
    axios.get("http://localhost:5000/users").then(res => setUsers(res.data))
  }, [])
  const deleteUser =(userId: number) => {
    let id = "";
    if(userId){
      id = `id=${userId}`
    }
    fetch(`http://localhost:5000/user/delete?${id}`, { method: "DELETE" })
        .then((res) => {if(res.status === 200){
          axios.get("http://localhost:5000/users").then(res => setUsers(res.data))
        }})
        .catch(err => console.log(err))
  }
  // if (loading) {
  //   return <p>loading...</p>;
  // }
  return (
    <Container className="px-3">
    <div className="d-flex justify-content-between  my-3">
    <h4 className="mb-0">Users</h4>
    <Button>create</Button>
    </div>

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
          {users &&
            users.length > 0 &&
            users.map((data:users, index:number) => (
              <tr key={data.id}>
                <td>{index + 1}</td>
                <td>{data.first_name}</td>
                <td>{data.last_name}</td>
                <td>{data.email}</td>
                <td><i className="bi bi-trash" onClick ={() => deleteUser(data.id)}></i></td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}
