import { useContext } from "react";
import { Context } from "../../App";
import style from "./style.module.css";

interface IButton {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  type:
    | "logOut"
    | "btnMain"
    | "btnBack"
    | "btnShop"
    | "btnShowMore"
    | "btnTabActive"
    | "btnTabUnactive"
    | "btnCategory";
  className?: string;
}

const getButtonStyle = (
  type:
    | "logOut"
    | "btnMain"
    | "btnBack"
    | "btnShop"
    | "btnShowMore"
    | "btnTabActive"
    | "btnTabUnactive"
    | "btnCategory"
) => {
  if (type === "logOut") {
    return style.logOut;
  }
  if (type === "btnMain") {
    return style.btnMain;
  }
  if (type === "btnBack") {
    return style.btnBack;
  }
  if (type === "btnShop") {
    return style.btnShop;
  }
  if (type === "btnShowMore") {
    return style.btnShowMore;
  }
  if (type === "btnTabActive") {
    return style.btnTabActive;
  }
  if (type === "btnTabUnactive") {
    return style.btnTabUnactive;
  }
  if (type === "btnCategory") {
    return style.btnCategory;
  }
};

export const Button = (props: IButton) => {
  const { isDark } = useContext(Context);
  return (
    <button
      className={`${props.className} ${style.button} ${
        isDark ? style.buttonDark : getButtonStyle(props.type)
      } `}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};
