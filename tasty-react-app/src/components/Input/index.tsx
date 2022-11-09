import { ChangeEventHandler, useContext } from "react";
import { Context } from "../../App";
import style from "./style.module.css";

interface Input {
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  type?: string;
  label?: string;
  id?: string;
  uniqType: "burgerMenu" | "inputForRegistration" | "delivery" | "radio";
  refObj?: any;
  error?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  pattern?: string;
  name?: string;
  forRadio?: string;
}
const getInputStyle = (
  uniqType: "burgerMenu" | "inputForRegistration" | "delivery" | "radio"
) => {
  if (uniqType === "burgerMenu") {
    return style.burgerMenu;
  }
  if (uniqType === "inputForRegistration") {
    return style.inputForRegistration;
  }
  if (uniqType === "delivery") {
    return style.delivery;
  }
  if (uniqType === "radio") {
    return style.radio;
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
          className={`${style.input} ${getInputStyle(props.uniqType)} ${
            props.error ? style.error : ""
          }`}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
          ref={props.refObj}
          type={props.type}
          required={true}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          name={props.name}
        ></input>
        <span
          className={`${style.forRadio} ${
            isDark ? style.darkForRadio : style.forRadio
          }`}
        >
          {props.forRadio}
        </span>
        <div
          className={`${style.textError} ${isDark ? style.darkTextError : ""}`}
        >
          {props.error}
        </div>
      </label>
    </div>
  );
};
