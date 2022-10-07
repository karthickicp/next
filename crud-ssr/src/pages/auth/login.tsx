import { Button, Card, styled, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import AuthLayout from "layouts/authLayout";
import type { NextPageWithLayout } from "pages/_app";
import { ReactElement } from "react";

// styles
const LoginCard = styled(Card)({
  padding: 16,
});
const Login: NextPageWithLayout = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {({ handleSubmit, errors, handleChange, handleBlur, values }) => (
          <LoginCard>
            <Typography variant="h1">Login</Typography>
            <form onSubmit={handleSubmit}>
              <TextField fullWidth variant="outlined" placeholder="email" />
              {errors.email && (
                <Typography variant="caption">{errors.email}</Typography>
              )}
              <TextField fullWidth variant="outlined" placeholder="password" />
              {errors.password && (
                <Typography variant="caption">{errors.password}</Typography>
              )}
              <Button variant="contained">Submit</Button>
            </form>
          </LoginCard>
        )}
      </Formik>
    </>
  );
};

Login.getLayout = function getLayout(Login: ReactElement) {
  return <AuthLayout>{Login}</AuthLayout>;
};

export default Login;
