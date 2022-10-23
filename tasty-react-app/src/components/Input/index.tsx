import style from "./style.module.css";
import { ChangeEventHandler, useContext } from "react";
import { Context } from "../../App";

interface Input {
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  type?: string;
  label?: string;
  id?: string;
  uniqType:
    | "burgerMenu"
    | "inputForConverter"
    | "primary"
    | "inputForRegistration"
    | "checkbox"
    | "search";
  refObj?: any;
  error?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  pattern?: string;
}
const getInputStyle = (
  uniqType:
    | "burgerMenu"
    | "inputForConverter"
    | "primary"
    | "inputForRegistration"
    | "checkbox"
    | "search"
) => {
  if (uniqType === "burgerMenu") {
    return style.burgerMenu;
  }
  if (uniqType === "inputForConverter") {
    return style.inputForConverter;
  }
  if (uniqType === "primary") {
    return style.primary;
  }
  if (uniqType === "inputForRegistration") {
    return style.inputForRegistration;
  }
  if (uniqType === "checkbox") {
    return style.checkbox;
  }
  if (uniqType === "search") {
    return style.search;
  }
};
export const Input = (props: Input) => {
  const { isDark } = useContext(Context);
  return (
    <div>
      <label
        className={`${style.label} ${isDark ? style.darkLabel : style.label}`}
      >
        {props.label}
        <input
          className={`${style.input} ${
            isDark ? style.darkInput : getInputStyle(props.uniqType)
          } ${props.error ? style.error : ""}`}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          ref={props.refObj}
          type={props.type}
          required={true}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
        ></input>
        <div
          className={`${style.textError} ${isDark ? style.darkTextError : ""}`}
        >
          {props.error}
        </div>
      </label>
    </div>
  );
};
