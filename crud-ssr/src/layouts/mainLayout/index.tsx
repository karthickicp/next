import { Container, Grid } from "@mui/material";

const MainLayout = ({ children }: any) => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};
export default MainLayout;
