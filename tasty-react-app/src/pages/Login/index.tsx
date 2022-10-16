import { Header } from "../../components/Header";
import { Login } from "../../components/LoginForm";
import { Container } from "../../components/Container";
import { AuthTitle } from "../../components/AuthTitle";

export const LoginPage = () => {
  return (
    <Container>
      <Header />
      <AuthTitle />
      <Login />
    </Container>
  );
};
