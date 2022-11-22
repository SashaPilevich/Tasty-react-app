import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { InfoTemplate } from "../../components/InfoTemplate";
import style from "./style.module.css";

export const RegisterSuccess = () => {
  const { isDark } = useContext(Context);
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/category");
  };

  return (
    <Container>
      <Header />
      <InfoTemplate
        title={"Регистрация прошла успешно"}
        onClick={navigateToHome}
        labelBtn={"На главную"}
      >
        <p className={`${isDark ? style.darkText : style.text}`}>
          Пожалуйста активируйте ваш аккаунт
        </p>
        <p className={`${isDark ? style.darkText : style.text}`}>
          по ссылке на почте{" "}
        </p>
        <p className={`${isDark ? style.darkText : style.text}`}>
          Пожалуйста,проверьте ваш email
        </p>
      </InfoTemplate>
    </Container>
  );
};
