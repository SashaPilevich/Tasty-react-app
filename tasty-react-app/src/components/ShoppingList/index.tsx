import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSelectedRecipe } from "../../api/recipe";
import { IRecipe } from "../../types/post";
import { Header } from "../Header";
import { Recipe } from "../Recipe";
import { ButtonPanel } from "../ButtonPanel";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setRecipe } from "../../redux/actions/category";
import { TState } from "../../redux/store";

export const ShoppingList = () => {
  const navigate = useNavigate();
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
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className={style.container}>
      {recipe.length !== 0
        ? recipe.map((item) => {
            return (
              <div key={item.id}>
                <Header />
                <ButtonPanel onClick={goBack} />
                <h2 className={style.title}>Список ингредиентов</h2>
                <Recipe
                  key={item.id}
                  id={item.id}
                  ingredients={item.ingredients}
                  onClickDelete={() => {}}
                />
              </div>
            );
          })
        : ""}
    </div>
  );
};
