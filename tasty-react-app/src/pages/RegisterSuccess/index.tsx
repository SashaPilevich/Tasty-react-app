import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { Button } from "../../components/Button";
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
        title={"Registration Confirmation"}
        onClick={navigateToHome}
        labelBtn={"Home"}
      >
        <p className={`${style.text} ${isDark ? style.darkText : ""}`}>
          Please activate your account with
        </p>
        <p className={`${style.text} ${isDark ? style.darkText : ""}`}>
          the activation link in the email{" "}
        </p>
        <p className={`${style.text} ${isDark ? style.darkText : ""}`}>
          Please, check your email
        </p>
      </InfoTemplate>
    </Container>
  );
};
