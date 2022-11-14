import { ChangeEventHandler, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { confirmPassword } from "../../api/auth";
import { Context } from "../../App";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { InfoTemplate } from "../../components/InfoTemplate";
import { Input } from "../../components/Input";
import style from "./style.module.css";
import { NotificationManager } from "react-notifications";
import {
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validation";
import { Button } from "../../components/Button";

export const ConfirmPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const { uid, token } = useParams<{ uid: string; token: string }>();
  const { isDark } = useContext(Context);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(true);
  const openPassword = () => {
    setShowPassword(false);
  };
  const closePassword = () => {
    setShowPassword(true);
  };

  const handlePassword: ChangeEventHandler<HTMLInputElement> = (event) => {
    const error = validatePassword(event.target.value);
    if (error) {
      setPasswordError(error);
    } else {
      setPasswordError("");
    }
    setPassword(event.target.value);
  };
  const handleConfirmNewPassword: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const error = validateConfirmPassword(password, confirmNewPassword);
    if (error) {
      setConfirmPasswordError(error);
    } else {
      setConfirmPasswordError("");
    }
    setConfirmNewPassword(event.target.value);
  };

  const handleConfirmBlur = () => {
    const error = validateConfirmPassword(password, confirmNewPassword);
    setConfirmPasswordError(error);
  };
  const handleConfirmFocus = () => {
    setConfirmPasswordError("");
  };

  const handleConfirmPassword = () => {
    if (uid && token && password) {
      confirmPassword(uid, token, password).then((response) => {
        if (response.ok) {
          navigate("/login");
        } else {
          NotificationManager.error("Что-то пошло не так");
        }
      });
    }
  };
  return (
    <Container>
      <Header />
      <div className={style.container}>
        <p className={`${isDark ? style.darkText : style.text}`}>
          Пожалуйста введите новый пароль
        </p>
        <div
          className={
            showPassword ? style.inputPasswordShow : style.inputPasswordClose
          }
          onClick={showPassword ? openPassword : closePassword}
        >
          <Input
            uniqType="inputForRegistration"
            label="Пароль"
            onChange={handlePassword}
            value={password}
            error={passwordError}
            type={showPassword ? "password" : "text"}
          />
        </div>
        <div className={style.inputContainer}>
          <Input
            uniqType="inputForRegistration"
            label="Подтвердите пароль"
            onChange={handleConfirmNewPassword}
            value={confirmNewPassword}
            error={confirmPasswordError}
            onBlur={handleConfirmBlur}
            onFocus={handleConfirmFocus}
            type="password"
          />
        </div>
        <Button
          type="btnCategory"
          onClick={handleConfirmPassword}
          label={"Сменить"}
        />
      </div>
    </Container>
  );
};
