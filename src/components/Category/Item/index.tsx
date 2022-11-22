import style from "./style.module.css";
import { Like, picture, Save, time, kcal } from "../../../assets";
import { IPost } from "../../../types/post";
import {
  MouseEventHandler,
  ReactEventHandler,
  useContext,
  useState,
} from "react";

import { Context } from "../../../App";
import { useDispatch } from "react-redux";
import { likeRecipes, saveRecipes } from "../../../redux/actions/category";

interface IProps extends IPost {
  isLarge?: boolean;
  isSelected?: boolean;
  isCategory?: boolean;
}
export const ItemOfCategory = (props: IProps) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(props.name);
  const [back, setBack] = useState(props.back);
  const { user } = useContext(Context);
  const { isLarge, ...post } = props;
  const handleError: ReactEventHandler<HTMLImageElement> = () => {
    setImage(picture);
  };
  const handleLikeItem: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    dispatch(likeRecipes(post));
  };
  const handleSaveItem: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    dispatch(saveRecipes(post));
  };

  return (
    <div
      className={` ${props.isSelected ? style.selectedItem : style.container}`}
    >
      <div
        className={`${props.isSelected ? style.selectedFront : style.front}`}
      >
        {image ? (
          <img
            className={`${
              props.isSelected ? style.selectedImage : style.image
            }`}
            src={props.name}
            alt={props.title}
            onError={handleError}
          />
        ) : (
          <img className={style.image} src={picture} alt={props.title} />
        )}
        <p className={` ${props.isSelected ? style.selectedText : style.text}`}>
          {props.title}
        </p>
      </div>
      {!props.isSelected ? (
        <div className={style.back}>
          {back
            ? back.map((item, index) => {
                return (
                  <img className={style.imgBack} src={item} key={index}></img>
                );
              })
            : ""}
          <p className={style.textBack}>{props.title}</p>
        </div>
      ) : (
        ""
      )}
      {props.isCategory ? (
        <div className={`${user ? style.info : style.infoWithoutUser}`}>
          <div className={style.icons}>
            <img
              className={`${user ? style.ico : style.icoWithoutUser}`}
              src={time}
              alt="timeToCook"
            ></img>
            <img
              className={`${user ? style.ico : style.icoWithoutUser}`}
              src={kcal}
              alt="timeToCook"
            ></img>
          </div>
          <div className={style.about}>
            <span className={style.time}>{props.time}</span>
            <span className={style.kcal}>{props.kcal}</span>
          </div>
          {user ? (
            <div className={style.likeAndSave}>
              <button onClick={handleSaveItem}>
                <Save
                  fill={
                    props.saved ? "red" : "rgb(94.509804%,76.862746%,5.882353%)"
                  }
                />
              </button>

              <button onClick={handleLikeItem}>
                <Like
                  fill={
                    props.liked ? "red" : "rgb(94.509804%,76.862746%,5.882353%)"
                  }
                />
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
