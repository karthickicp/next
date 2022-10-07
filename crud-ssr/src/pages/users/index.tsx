import React from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import { deleteUser, getUsers } from "network/lib/users";
import Link from "next/link";
interface Users {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}
interface PropTypes {
  users: Users[];
}
const Users = ({ users }: PropTypes) => {
  console.log(users, "users");
  return (
    <>
      <Link href="users/view">
        <Button variant="contained">Create User</Button>
      </Link>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Avatar</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.length > 0 &&
            users.map((user: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <img src={user.avatar} alt="profile pic" />
                </TableCell>
                <TableCell>
                  <RemoveRedEyeOutlinedIcon />
                  <ModeEditOutlinedIcon />
                  <DeleteOutlineOutlinedIcon />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const users = await getUsers();
    return { props: { users: users.data } };
  } catch (err) {
    console.log(err);
  }
}
export default Users;
