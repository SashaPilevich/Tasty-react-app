import { ChangeEventHandler, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { auth } from "../../config/firebase";
import logging from "../../config/logging";
import { TState } from "../../redux/store";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../utils/validation";
import { Button } from "../Button";
import { Input } from "../Input";
import { Preloader } from "../Preloader";
import style from "./style.module.css";
export const RegisterPage = () => {
  const { isDark } = useContext(Context);
  const navigate = useNavigate();
  const isLoading = useSelector(
    (state: TState) => state.categoryReducer.isLoading
  );
  const [registering, setRegistering] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState("");

  const [confirm, setConfirm] = useState<string>("");
  const [confirmError, setConfirmError] = useState("");

  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState(true);
  const openPassword = () => {
    setShowPassword(false);
  };
  const closePassword = () => {
    setShowPassword(true);
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

  const handlePassword: ChangeEventHandler<HTMLInputElement> = (event) => {
    const error = validatePassword(event.target.value);
    if (error) {
      setPasswordError(error);
    } else {
      setPasswordError("");
    }
    setPassword(event.target.value);
  };

  const handleConfirmPassword: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const error = validateConfirmPassword(password, confirm);
    if (error) {
      setConfirmError(error);
    } else {
      setConfirmError("");
    }
    setConfirm(event.target.value);
  };

  const handleEmailBlur = () => {
    const error = validateEmail(email);
    setEmailError(error);
  };
  const handleEmailFocus = () => {
    setEmailError("");
  };

  const handlePasswordBlur = () => {
    const error = validatePassword(password);
    setPasswordError(error);
  };
  const handlePasswordFocus = () => {
    setPasswordError("");
  };

  const handleConfirmBlur = () => {
    const error = validateConfirmPassword(password, confirm);
    setConfirmError(error);
  };
  const handleConfirmFocus = () => {
    setConfirmError("");
  };

  const signUpWithEmailAndPassword = () => {
    if (password !== confirm)
      setError("Пожалуйста,убедитесь что ваши пароли совпадают");
    if (error !== "") setError("");

    setRegistering(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        logging.info(result);
        navigate("/login");
      })
      .catch((error) => {
        logging.error(error);
        if (error.code.includes("auth/weak-password")) {
          setError("Пожалуйста,введите более надёжный пароль");
        } else if (error.code.includes("auth/email-already-in-use")) {
          setError("Электронная почта уже используется");
        } else {
          setError("Не удалось зарегистрироваться.Попробуйте позже");
        }
        setRegistering(false);
      });
  };
  return (
    <div className={style.container}>
      {!isLoading ? (
        <>
          <div className={style.inputContainer}>
            <Input
              label="Email"
              onChange={handleEmail}
              value={email}
              uniqType={"inputForRegistration"}
              type="email"
              error={emailError}
              onBlur={handleEmailBlur}
              onFocus={handleEmailFocus}
            />
          </div>

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
              onBlur={handlePasswordBlur}
              onFocus={handlePasswordFocus}
              type={showPassword ? "password" : "text"}
            />
          </div>

          <div className={style.inputContainer}>
            <Input
              label="Подтвердить пароль"
              onChange={handleConfirmPassword}
              value={confirm}
              uniqType={"inputForRegistration"}
              error={confirmError}
              onBlur={handleConfirmBlur}
              onFocus={handleConfirmFocus}
              type="password"
            />
          </div>
          <p
            className={`${style.textError} ${
              isDark ? style.darkTextError : ""
            }`}
          >
            {error}
          </p>
          <Button
            label="Отправить"
            onClick={() => signUpWithEmailAndPassword()}
            type="btnCategory"
          />
          <p className={`${style.text} ${isDark ? style.darkText : ""}`}>
            Если у вас уже есть аккаунт вы можете{" "}
            <Link
              className={`${style.linkLogin} ${
                isDark ? style.darkLinkLogin : ""
              }`}
              to="/login"
            >
              Войти
            </Link>
          </p>
        </>
      ) : (
        <Preloader />
      )}
    </div>
  );
};
