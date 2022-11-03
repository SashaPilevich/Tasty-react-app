import {
  ChangeEventHandler,
  FormEventHandler,
  useContext,
  useState,
} from "react";
import style from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../Button";
import { Input } from "../Input";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../App";
import { login, getUser } from "../../api/auth";
import { validateEmail, validatePassword } from "../../utils/validation";
import { TState } from "../../redux/store";
import { setError } from "../../redux/actions/auth";
import { setIsLoading } from "../../redux/actions/category";

export const Login = () => {
  const error = useSelector((state: TState) => state.authReducer.setError);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDark, setUser } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const openPassword = () => {
    setShowPassword(false);
  };
  const closePassword = () => {
    setShowPassword(true);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    dispatch(setError(""));
    dispatch(setIsLoading(true));
    const errors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setEmailError(errors.email);
    setPasswordError(errors.password);

    const isValidForm = Object.values(errors).every((error) => error === "");
    if (isValidForm) {
      dispatch(setError(""));
      let isOk = true;
      login(email, password)
        .then((response) => {
          if (response.ok) {
            isOk = true;
          } else {
            isOk = false;
          }
          return response.json();
        })
        .then((json) => {
          if (isOk) {
            localStorage.setItem("access", json.access);
            localStorage.setItem("refresh", json.refresh);

            getUser()
              .then((response) => {
                return response.json();
              })
              .then((user) => {
                navigate("/category");
                setUser(user);
              });
          } else {
            if (
              json.detail ===
              "No active account found with the given credentials"
            ) {
              dispatch(
                setError(
                  "Активная учетная запись с указанными учетными данными не найдена"
                )
              );
              return;
            }
          }
        });
    }
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

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.container}>
        <div className={style.inputContainer}>
          <Input
            label="Email"
            value={email}
            onChange={handleEmail}
            uniqType={"inputForRegistration"}
            onBlur={handleEmailBlur}
            onFocus={handleEmailFocus}
            error={emailError}
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
        <p className={style.textError}>{error}</p>
        <Button type="btnCategory" onClick={() => {}} label={"Войти"} />
        <p className={`${style.text} ${isDark ? style.darkText : ""}`}>
          Забыли пароль?{" "}
          <Link
            to="/resetpassword"
            className={`${style.linkLogin} ${
              isDark ? style.darkLinkLogin : ""
            }`}
          >
            Сбросить пароль
          </Link>
        </p>
      </div>
    </form>
  );
};
