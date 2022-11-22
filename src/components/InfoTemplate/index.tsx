import { ReactNode, useContext } from "react";
import { Context } from "../../App";
import { Button } from "../Button";
import style from "./style.module.css";

interface IProps {
  title: string;
  children: ReactNode;
  labelBtn: string;
  onClick: () => void;
}
export const InfoTemplate = ({
  title,
  children,
  onClick,
  labelBtn,
}: IProps) => {
  const { isDark } = useContext(Context);
  return (
    <div className={style.container}>
      <h2 className={`${isDark ? style.darkTitle : style.title}`}>{title}</h2>
      <div className={style.textContainer}>{children}</div>
      <Button label={`${labelBtn}`} onClick={onClick} type="btnCategory" />
    </div>
  );
};
