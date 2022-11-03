const emailRegExp = /(^|\s+)[\w\-.]+@([\w-]+\.)+[\w-]{2,4}($|\s+)/;
const latinSymbol = /[A-Za-z]/;
const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])/;
const addressRegExp = /^[ 0-9 /]+$/;
const telRegExp = /^((7|\+3)[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}$/;

export const validateRequired = (value: string) => {
  if (value === "") {
    return "Обязательное поле";
  }
  return "";
};

export const validateEmail = (value: string): any => {
  if (value === "") {
    return "Обязательное поле";
  }
  if (!latinSymbol.test(value)) {
    return "Используйте латинские символы";
  }
  if (!emailRegExp.test(value)) {
    return "Неправильный формат email";
  }
  return "";
};

export const validatePassword = (value: string) => {
  if (value === "") {
    return "Обязательное поле";
  }
  if (!passwordRegExp.test(value)) {
    return "Пароль должен содержать цифры и буквы в разных регистрах";
  }
  return "";
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): any => {
  if (password !== confirmPassword) {
    return "Пароли не совпадают";
  }
  return "";
};

export const validateAddress = (value: string) => {
  if (value === "") {
    return "Обязательное поле";
  }
  if (!addressRegExp.test(value)) {
    return "Неправильный формат адреса";
  }
  return "";
};
export const validatePhoneNumber = (value: string) => {
  if (value === "") {
    return "Обязательное поле";
  }
  if (!telRegExp.test(value)) {
    return "Неправильный формат номера телефона";
  }
  return "";
};
