import { ChangeEventHandler, MouseEvent, useContext, useState } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { validateEmail, validatePassword } from "../../utils/validation";
import { auth, Providers } from "../../config/firebase";
import logging from "../../config/logging";
import firebase from "firebase/compat/app";
import style from "./style.module.css";
import { SignInWithSocialMedia } from "../SignInWithSocialMedia";

export const Login = () => {
  const navigate = useNavigate();
  const { isDark, setUser } = useContext(Context);
  const [authenticating, setAuthenticating] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const openPassword = () => {
    setShowPassword(false);
  };
  const closePassword = () => {
    setShowPassword(true);
  };
  const signInWithEmailAndPassword = () => {
    if (error !== "") setError("");
    setAuthenticating(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        logging.info(result);
        setUser(true);
        navigate("/category");
        return result.user;
      })
      .then((person) => {
        if (person) {
          localStorage.setItem("access", person.uid);
          localStorage.setItem("refresh", person.refreshToken);
        }
      })
      .catch((error) => {
        logging.error(error);
        setAuthenticating(false);
        setError("Пользователь не найден");
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
  const handlePassword: ChangeEventHandler<HTMLInputElement> = (event) => {
    const error = validatePassword(event.target.value);
    if (error) {
      setPasswordError(error);
    } else {
      setPasswordError("");
    }
    setPassword(event.target.value);
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

  const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
    if (error !== "") setError("");
    setAuthenticating(true);
    SignInWithSocialMedia(provider)
      .then((result) => {
        logging.info(result);
        setUser(true);
        console.log(result);
        return result.user;
      })
      .then((person) => {
        if (person) {
          setEmail(`${person.email}`);
          navigate("/category");
          localStorage.setItem("access", person.uid);
          localStorage.setItem("refresh", person.refreshToken);
        }
      })
      .catch((error) => {
        logging.error(error);
        setAuthenticating(false);
        setError(error.message);
      });
  };

  return (
    <div className={style.container}>
      <div className={style.inputContainer}>
        <Input
          label="Email"
          value={email}
          onChange={handleEmail}
          uniqType={"inputForRegistration"}
          type="email"
          onBlur={handleEmailBlur}
          onFocus={handleEmailFocus}
          error={emailError}
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
      <p className={style.textError}>{error}</p>
      <Button
        type="btnCategory"
        onClick={() => signInWithEmailAndPassword()}
        label={"Войти"}
      />
      <Button
        label={"Войти с помощью Google"}
        onClick={() => signInWithSocialMedia(Providers.google)}
        type={"btnGoogle"}
      />
      <p className={`${isDark ? style.darkText : style.text}`}>
        Забыли пароль?{" "}
        <Link
          to="/resetpassword"
          className={`${isDark ? style.darkLinkLogin : style.linkLogin}`}
        >
          Сбросить пароль
        </Link>
      </p>
    </div>
  );
};
