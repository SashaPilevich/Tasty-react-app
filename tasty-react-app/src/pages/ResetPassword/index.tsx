import { ChangeEventHandler, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../../api/auth";
import { Context } from "../../App";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { InfoTemplate } from "../../components/InfoTemplate";
import { Input } from "../../components/Input";
import style from "./style.module.css";
import { NotificationManager } from "react-notifications";
import { validateEmail } from "../../utils/validation";

export const ResetPassword = () => {
  const { isDark } = useContext(Context);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmail: ChangeEventHandler<HTMLInputElement> = (event) => {
    const error = validateEmail(event.target.value);
    if (error) {
      setEmailError(error);
    } else {
      setEmailError("");
    }
    setEmail(event.target.value);
  };

  const sendEmail = () => {
    resetPassword(email).then((response) => {
      if (response.ok) {
        NotificationManager.info(
          "Сообщение о смене пароля отпралено вам на почту"
        );
      } else {
        NotificationManager.error("Что-то пошло не так");
      }
      setEmail("");
    });
  };
  return (
    <Container>
      <Header />
      <InfoTemplate
        title={"Сброс пароля"}
        labelBtn="Сменить"
        onClick={sendEmail}
      >
        <p className={`${style.text} ${isDark ? style.darkText : ""}`}>
          Пожалуйста введите email
        </p>

        <div className={style.inputContainer}>
          <Input
            value={email}
            uniqType="inputForRegistration"
            onChange={handleEmail}
            label="Email"
            error={emailError}
          />
        </div>
      </InfoTemplate>
      <p className={`${style.text} ${isDark ? style.darkText : ""}`}>
        Вернуться к{" "}
        <Link
          className={`${style.linkLogin} ${isDark ? style.darkLinkLogin : ""}`}
          to="/login"
        >
          авторизации
        </Link>
      </p>
    </Container>
  );
};
