import { tmsFetch } from "../utils/fetch";

export const registerUser = (
  username: string,
  email: string,
  password: string
) => {
  return fetch("https://studapi.teachmeskills.by/auth/users/", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const activateUser = (uid: string, token: string) => {
  return fetch("https://studapi.teachmeskills.by/auth/users/activation/", {
    method: "POST",
    body: JSON.stringify({ uid, token }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
};

export const login = (email: string, password: string) => {
  return fetch("https://studapi.teachmeskills.by/auth/jwt/create/", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUser = () => {
  return tmsFetch("https://studapi.teachmeskills.by/auth/users/me/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const refreshToken = () => {
  const refresh = localStorage.getItem("refresh");
  return fetch("https://studapi.teachmeskills.by/auth/jwt/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  });
};

export const resetPassword = (email: string) => {
  return fetch("https://studapi.teachmeskills.by/auth/users/reset_password/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
};

export const confirmPassword = (
  uid: string,
  token: string,
  newPassword: string
) => {
  return fetch(
    "https://studapi.teachmeskills.by/auth/users/reset_password_confirm/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid, token, new_password: newPassword }),
    }
  );
};
