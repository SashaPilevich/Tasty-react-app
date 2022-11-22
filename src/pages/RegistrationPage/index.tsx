import { AuthTitle } from "../../components/AuthTitle";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { Registration } from "../../components/Registration";
export const RegistrationPage = () => {
  return (
    <Container>
      <Header />
      <AuthTitle />
      <Registration />
    </Container>
  );
};
