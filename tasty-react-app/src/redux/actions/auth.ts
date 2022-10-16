import { Dispatch } from "redux";
import { registerUser } from "../../api/auth";
import { errors } from "../../components/Registration";
import { ACTIONS } from "../constans";
import { TState } from "../store";
import { NotificationManager } from "react-notifications";

export const setError = (error: string) => {
  return {
    type: ACTIONS.SET_ERROR,
    error,
  };
};

export const registerUserAction = (
  user: string,
  email: string,
  password: string
) => {
  return (dispatch: Dispatch, getState: () => TState) => {
    const isValidForm = Object.values(errors).every((error) => error === "");

    if (isValidForm) {
      let isOk = true;
      dispatch(setError(""));
      registerUser(user, email, password)
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
            NotificationManager.success(
              "Please activate your account with the activation link in the email!Please, check your email."
            );
          } else {
            if (
              json?.username?.includes(
                "A user with that username already exists."
              )
            ) {
              dispatch(setError("Пользователь с таким именем уже существует."));
              return;
            }
            if (json?.email?.includes("user with this Email already exists.")) {
              dispatch(setError("Пользователь с таким email уже существует."));
              return;
            }
            if (
              json?.password?.includes(
                "This password is too short. It must contain at least 8 characters."
              )
            ) {
              dispatch(
                setError("Пароль должен состоять не менее чем из 8 символов.")
              );
              return;
            } else if (
              json?.password?.includes("This password is too common.")
            ) {
              dispatch(setError("Этот пароль слишком распространен."));
              return;
            } else if (
              json?.password?.includes(
                "The password is too similar to the username."
              )
            ) {
              dispatch(setError("Пароль слишком похож на имя пользователя."));
            }
          }
        });
    }
  };
};
