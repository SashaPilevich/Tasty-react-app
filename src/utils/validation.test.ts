import {
  validateRequired,
  validateAddress,
  validatePhoneNumber,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "./validation";

describe("validateRequired:", () => {
  test("validateRequired:при вводе не пустой строки функция возвращает пустую строку", () => {
    expect(validateRequired("some string")).toEqual("");
  });
  test("validateRequired:если в поле ничего не введено то функция возвращает ошибку", () => {
    expect(validateRequired("")).toEqual("Обязательное поле");
  });
});

describe("validateAddress:", () => {
  test("validateAddress:если в поле ничего не введено то функция возвращает ошибку", () => {
    expect(validateAddress("")).toEqual("Обязательное поле");
  });
  test("validateAddress:если в поле введен адрес неправильного формата то функция возвращает ошибку", () => {
    expect(validateAddress("street")).toEqual("Неправильный формат адреса");
  });
});

describe("validatePhoneNumber:", () => {
  test("validatePhoneNumber:если в поле ничего не введено то функция возвращает ошибку", () => {
    expect(validatePhoneNumber("")).toEqual("Обязательное поле");
  });
  test("validatePhoneNumber:если в поле введен невалидный номер телефона то функция вернет ошибку", () => {
    expect(validatePhoneNumber("+375")).toEqual(
      "Неправильный формат номера телефона"
    );
  });
  test("validatePhoneNumber:если в поле введен валидный номер телефона то функция вернет пустую строку", () => {
    expect(validatePhoneNumber("+375297620822")).toEqual("");
  });
});

describe("validateEmail:", () => {
  test("validateEmail:при вводе валидного емейла функция возвращает пустую строку", () => {
    expect(validateEmail("pilevichsasha@gmail.com")).toEqual("");
  });

  test("validateEmail: при вводе пустой строки функция возвращает ошибку", () => {
    expect(validateEmail("")).toEqual("Обязательное поле");
  });

  test("validateEmail: при вводе емейла неправильного формата функция возвращает ошибку", () => {
    expect(validateEmail("pilevichsаshаgmail.com")).toEqual(
      "Неправильный формат email"
    );
  });

  test("validateEmail: при вводе емейла с использованием русских букв функция возвращает ошибку", () => {
    expect(validateEmail("пилевич@мейл.ру")).toEqual(
      "Используйте латинские символы"
    );
  });
});

describe("validatePassword:", () => {
  test("validatePassword:при вводе пустой строки функция возвращает ошибку", () => {
    expect(validatePassword("")).toEqual("Обязательное поле");
  });
  test("validatePassword:при вводе невалидного пароля функция возвращает ошибку", () => {
    expect(validatePassword("090121ss")).toEqual(
      "Пароль должен содержать цифры и буквы в разных регистрах"
    );
  });
  test("validatePassword:при вводе валидного пароля функция возвращает пустую строку", () => {
    expect(validatePassword("090121Ss")).toEqual("");
  });
});

describe("validateConfirmPassword:", () => {
  test("validateConfirmPassword: при совпадении паролей функция возвращает пустую строку", () => {
    expect(validateConfirmPassword("090121Ss", "090121Ss")).toEqual("");
  });
  test("validateConfirmPassword: если пароли не совпадают функция возвращает ошибку", () => {
    expect(validateConfirmPassword("090121Qs", "090121Ss")).toEqual(
      "Пароли не совпадают"
    );
  });
});
