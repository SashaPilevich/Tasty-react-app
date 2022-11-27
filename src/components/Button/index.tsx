import { MouseEventHandler } from "react";
import style from "./style.module.css";

interface IButton {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type:
    | "btnMain"
    | "btnBack"
    | "btnShop"
    | "btnShowMore"
    | "btnTabActive"
    | "btnTabUnactive"
    | "btnCategory"
    | "btnDelete"
    | "btnSave"
    | "btnBuy"
    | "btnShopList"
    | "btnGoogle";
}

const getButtonStyle = (
  type:
    | "btnMain"
    | "btnBack"
    | "btnShop"
    | "btnShowMore"
    | "btnTabActive"
    | "btnTabUnactive"
    | "btnCategory"
    | "btnDelete"
    | "btnSave"
    | "btnBuy"
    | "btnShopList"
    | "btnGoogle"
) => {
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
  if (type === "btnDelete") {
    return style.btnDelete;
  }
  if (type === "btnSave") {
    return style.btnSave;
  }
  if (type === "btnBuy") {
    return style.btnBuy;
  }
  if (type === "btnShopList") {
    return style.btnShopList;
  }
  if (type === "btnGoogle") {
    return style.btnGoogle;
  }
};

export const Button = (props: IButton) => {
  return (
    <button
      className={`${style.button} ${getButtonStyle(props.type)}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};
