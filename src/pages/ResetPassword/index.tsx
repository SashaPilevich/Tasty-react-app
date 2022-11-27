import { ChangeEventHandler, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../App";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { InfoTemplate } from "../../components/InfoTemplate";
import { Input } from "../../components/Input";
import { NotificationManager } from "react-notifications";
import { validateEmail } from "../../utils/validation";
import style from "./style.module.css";
import { auth } from "../../config/firebase";
import logging from "../../config/logging";

export const ResetPassword = () => {
  const { isDark } = useContext(Context);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const resetPasswordRequest = () => {
    if (error !== "") setError("");
    setSending(true);
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        logging.info("send to email");
        setSent(true);
        setSending(false);
        NotificationManager.info(
          "Сообщение о смене пароля отпралено вам на почту"
        );
      })
      .catch((error) => {
        logging.error(error);
        NotificationManager.error("Что-то пошло не так");
        setSending(false);
        setEmail("");
      });
  };

  const handleEmail: ChangeEventHandler<HTMLInputElement> = (event) => {
    const error = validateEmail(event.target.value);
    if (error) {
      setEmailError(error);
    } else {
      setEmailError("");
    }
    setEmail(event.target.value);
  };
  return (
    <Container>
      <Header />
      <InfoTemplate
        title={"Сброс пароля"}
        labelBtn="Сменить"
        onClick={() => resetPasswordRequest()}
      >
        <p className={`${isDark ? style.darkText : style.text}`}>
          Пожалуйста введите email
        </p>

        <div className={style.inputContainer}>
          <Input
            value={email}
            uniqType="inputForRegistration"
            onChange={handleEmail}
            label="Email"
            type="email"
            error={emailError}
          />
        </div>
      </InfoTemplate>
      <p className={`${isDark ? style.darkText : style.text}`}>
        Вернуться к{" "}
        <Link
          className={`${isDark ? style.darkLinkLogin : style.linkLogin}`}
          to="/login"
        >
          авторизации
        </Link>
      </p>
    </Container>
  );
};
