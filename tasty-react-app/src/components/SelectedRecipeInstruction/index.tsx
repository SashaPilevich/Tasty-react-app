import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSelectedRecipe } from "../../api/recipe";
import { Context } from "../../App";
import { setRecipe } from "../../redux/actions/category";
import { TState } from "../../redux/store";
import { IRecipe } from "../../types/post";
import { Button } from "../Button";
import { Recipe } from "../Recipe";
import style from "./style.module.css";

export const SelectedRecipeInstruction = () => {
  const { isDark } = useContext(Context);
  const params = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state: TState) => state.categoryReducer.recipe);

  useEffect(() => {
    dispatch(setRecipe([]));
    fetchSelectedRecipe(params.id).then((values) => {
      const linked = params.id;
      Number(linked);
      dispatch(setRecipe(values[Number(linked)]));
    });
  }, []);

  return (
    <div className={`${style.container} ${isDark ? style.darkContainer : ""}`}>
      <div className={style.wrapper}>
        {recipe
          ? recipe.map((item) => {
              return (
                <div key={item.id}>
                  <Recipe
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    title={item.title}
                    instructions={item.instructions}
                  />
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};
