import style from "./style.module.css";

export const Preloader = () => {
  return (
    <div className={style.loader}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
