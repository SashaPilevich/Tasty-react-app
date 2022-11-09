import { useContext } from "react";
import { useSelector } from "react-redux";
import { Context } from "../../App";
import { TState } from "../../redux/store";
import { CategorySelected } from "../CategorySelected";
import style from "./style.module.css";

export const LikedRecipes = () => {
  const { isDark } = useContext(Context);
  const recipes = useSelector(
    (state: TState) => state.categoryReducer.likedRecipes
  );
  return (
    <div className={`${isDark ? style.darkMain : style.main}`}>
      <CategorySelected posts={recipes} isLikeSave={true} />
    </div>
  );
};
