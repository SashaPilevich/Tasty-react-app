import style from "./style.module.css";
import { Like, picture1, Save } from "../../../assets";
import { IPost } from "../../../types/post";
import {
  MouseEventHandler,
  ReactEventHandler,
  useContext,
  useState,
} from "react";
import time from "./time.png";
import kcal from "./kcal.png";
import { Context } from "../../../App";
import { useDispatch } from "react-redux";
import { likeRecipes, saveRecipes } from "../../../redux/actions/category";

interface IProps extends IPost {
  isLarge?: boolean;
  isSelected?: boolean;
  isCategory?: boolean;
}
export const ItemOfCategory = (props: IProps) => {
  const [image, setImage] = useState(props.name);

  const { user } = useContext(Context);
  const dispatch = useDispatch();
  const { isLarge, ...post } = props;
  const handleError: ReactEventHandler<HTMLImageElement> = () => {
    setImage(picture1);
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
            {user ? (
              <div className={style.likeAndSave}>
                <button onClick={handleSaveItem}>
                  <Save
                    fill={
                      props.saved
                        ? "red"
                        : "rgb(94.509804%,76.862746%,5.882353%)"
                    }
                  />
                </button>

                <button onClick={handleLikeItem}>
                  <Like
                    fill={
                      props.liked
                        ? "red"
                        : "rgb(94.509804%,76.862746%,5.882353%)"
                    }
                  />
                </button>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
