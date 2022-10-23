import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { InfoTemplate } from "../../components/InfoTemplate";
import style from "./style.module.css";

export const EmailConfirmed = () => {
  const navigate = useNavigate();
  const navigateToLogin = () => {
    navigate("/login");
  };
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Container>
      <Header />
      <InfoTemplate
        title={"Success"}
        labelBtn={"Login"}
        onClick={navigateToLogin}
      >
        <p className={style.text}>Email confirmed</p>
        <p className={style.text}>Your registration is now completed</p>
      </InfoTemplate>
      <Button label={"Go Back"} onClick={goBack} type="btnCategory" />
    </Container>
  );
};
