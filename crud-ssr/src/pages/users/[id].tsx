import { getUser, getUsers } from "network/lib/users";
import React from "react";

const ViewUser = ({ user }: any) => {
  console.log(user);
  return <></>;
};

export async function getServerSideProps({ query }: any) {
  try {
    const user = await getUser(query?.id);
    console.log(user, "user");
    return { props: { users: user.data } };
  } catch (err) {
    console.log(err);
    return {};
  }
}

// export async function getServerSideProps({ query }: any) {
//   try {
//     const user = await getUser(query?.id);
//     return { props: { user: user.data } };
//   } catch (err) {
//     console.log(err);
//   }
// }

export default ViewUser;
