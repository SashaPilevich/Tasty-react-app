import { ReactNode } from "react";
import style from "./style.module.css";
interface IModal {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}
export const Modal = (props: IModal) => {
  return (
    <div
      className={`${props.active ? style.active : style.modal}`}
      onClick={() => props.setActive(false)}
    >
      <div
        className={`${
          props.active ? style.activeModalContent : style.modalContent
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
};
