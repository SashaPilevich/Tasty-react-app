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
        title={"Успех!"}
        labelBtn={"Войти"}
        onClick={navigateToLogin}
      >
        <p className={style.text}>Email подтвержден</p>
        <p className={style.text}>Ваша регистрация завершена</p>
      </InfoTemplate>
      <Button label={"Назад"} onClick={goBack} type="btnCategory" />
    </Container>
  );
};
