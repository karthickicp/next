import { Container, Grid, styled } from "@mui/material";

const Wrapper = styled(Container)({
  height: "100vh",
  width: "100%",
  float: "left",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // background: "#eeee",
});
const AuthLayout = ({ children }: any) => {
  return (
    <Wrapper maxWidth={false}>
      <Grid container>
        <Grid item xs={12} md={6} lg={4}>
          {children}
        </Grid>
      </Grid>
    </Wrapper>
  );
};
export default AuthLayout;
