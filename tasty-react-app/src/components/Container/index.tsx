import { ReactNode, useContext } from "react";
import { Context } from "../../App";
import style from "./style.module.css";

interface IProps {
  children: ReactNode;
}

export const Container = ({ children }: IProps) => {
  const { isDark } = useContext(Context);

  return (
    <div className={isDark ? style.darkContainer : style.container}>
      {children}
    </div>
  );
};
