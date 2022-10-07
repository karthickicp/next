import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import MainLayout from "layouts/mainLayout";

import { Button, ThemeProvider } from "@mui/material";
import theme from "theme";
import { getUsers } from "network/lib/users";
import Users from "./users";
import { useRouter } from "next/router";

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  return (
    <>
      <h1>Hi Luca</h1>
    </>
  );
};

Home.getLayout = function getLayout(Home: ReactElement) {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout>{Home}</MainLayout>
    </ThemeProvider>
  );
};

export async function getServerSideProps() {
  return {
    props: {},
    redirect: {
      permanent: false,
      destination: "/users",
    },
  };
}

export default Home;
