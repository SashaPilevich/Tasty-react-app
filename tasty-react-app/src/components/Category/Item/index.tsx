import style from "./style.module.css";
import { picture1 } from "../../../assets";
import { IPost } from "../../../types/post";
import { ReactEventHandler, useState } from "react";
import { Button } from "../../Button";
import time from "./time.png";
import kcal from "./kcal.png";

interface IProps extends IPost {
  isLarge?: boolean;
  isSelected?: boolean;
  isCategory?: boolean;
}
export const ItemOfCategory = (props: IProps) => {
  const [image, setImage] = useState(props.name);

  const handleError: ReactEventHandler<HTMLImageElement> = () => {
    setImage(picture1);
  };
  return (
    <div
      className={`${style.container} ${
        props.isSelected ? style.selectedItem : ""
      }`}
    >
      {image ? (
        <img
          className={`${style.image} ${
            props.isSelected ? style.selectedImage : ""
          }`}
          src={props.name}
          alt={props.title}
          onError={handleError}
        />
      ) : (
        <img className={style.image} src={picture1} alt={props.title} />
      )}
      <p
        className={`${style.text} ${
          props.isSelected ? style.selectedText : ""
        }`}
      >
        {props.title}
      </p>
      {props.isCategory ? (
        <>
          <div className={style.info}>
            <div className={style.icons}>
              <img className={style.ico} src={time} alt="timeToCook"></img>
              <img className={style.ico} src={kcal} alt="timeToCook"></img>
            </div>
            <div className={style.about}>
              <span className={style.time}>{props.time}</span>
              <span className={style.kcal}>{props.kcal}</span>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
