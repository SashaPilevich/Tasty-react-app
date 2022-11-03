import { ChangeEventHandler, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../App";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
  validateRequired,
} from "../../utils/validation";
import { Button } from "../Button";
import { Input } from "../Input";
import { Preloader } from "../Preloader";
import style from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { TState } from "../../redux/store";
import { registerUserAction, setError } from "../../redux/actions/auth";
export let errors: {
  user: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export const Registration = () => {
  const { isDark } = useContext(Context);
  const error = useSelector((state: TState) => state.authReducer.setError);
  const isLoading = useSelector(
    (state: TState) => state.categoryReducer.isLoading
  );
  const dispatch = useDispatch();

  const [user, setUser] = useState("");
  const [userError, setUserError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [showPassword, setShowPassword] = useState(true);
  const openPassword = () => {
    setShowPassword(false);
  };
  const closePassword = () => {
    setShowPassword(true);
  };

  const handleUser: ChangeEventHandler<HTMLInputElement> = (event) => {
    const error = validateRequired(event.target.value);
    if (error) {
      setUserError(error);
    } else {
      setUserError("");
    }
    setUser(event.target.value);
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
    const error = validateConfirmPassword(password, confirmPassword);
    if (error) {
      setConfirmPasswordError(error);
    } else {
      setConfirmPasswordError("");
    }
    setConfirmPassword(event.target.value);
  };

  const onClickLogin = () => {
    dispatch(setError(""));
    errors = {
      user: validateRequired(user),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
    };
    setUserError(errors.user);
    setEmailError(errors.email);
    setPasswordError(errors.password);
    setConfirmPasswordError(errors.confirmPassword);
    dispatch(registerUserAction(user, email, password) as any);
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
    const error = validateConfirmPassword(password, confirmPassword);
    setConfirmPasswordError(error);
  };
  const handleConfirmFocus = () => {
    setConfirmPasswordError("");
  };
  return (
    <div className={style.container}>
      {!isLoading ? (
        <>
          <div className={style.inputContainer}>
            <Input
              label="Имя"
              onChange={handleUser}
              value={user}
              uniqType={"inputForRegistration"}
              error={userError}
            />
          </div>
          <div className={style.inputContainer}>
            <Input
              label="Email"
              onChange={handleEmail}
              value={email}
              uniqType={"inputForRegistration"}
              error={emailError}
              onBlur={handleEmailBlur}
              onFocus={handleEmailFocus}
            />
          </div>

          {showPassword ? (
            <div className={style.inputPasswordShow} onClick={openPassword}>
              <Input
                uniqType="inputForRegistration"
                label="Пароль"
                onChange={handlePassword}
                value={password}
                error={passwordError}
                onBlur={handlePasswordBlur}
                onFocus={handlePasswordFocus}
                type="password"
              />
            </div>
          ) : (
            <div className={style.inputPasswordClose} onClick={closePassword}>
              <Input
                uniqType="inputForRegistration"
                label="Пароль"
                onChange={handlePassword}
                value={password}
                error={passwordError}
                onBlur={handlePasswordBlur}
                onFocus={handlePasswordFocus}
                type="text"
              />
            </div>
          )}

          <div className={style.inputContainer}>
            <Input
              label="Подтвердить пароль"
              onChange={handleConfirmPassword}
              value={confirmPassword}
              uniqType={"inputForRegistration"}
              error={confirmPasswordError}
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
          <Button label="Отправить" onClick={onClickLogin} type="btnCategory" />
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
