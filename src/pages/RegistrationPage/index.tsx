import { AuthTitle } from "../../components/AuthTitle";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { RegisterPage } from "../../components/Register";
export const RegistrationPage = () => {
  return (
    <Container>
      <Header />
      <AuthTitle />
      <RegisterPage />
    </Container>
  );
};
