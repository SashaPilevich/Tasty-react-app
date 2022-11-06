import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSelectedRecipe } from "../../api/recipe";
import { Context } from "../../App";
import { IRecipe } from "../../types/post";
import { Recipe } from "../Recipe";
import style from "./style.module.css";

export const SelectedRecipe = () => {
  const { isDark } = useContext(Context);
  const params = useParams();
  const [post, setPost] = useState<IRecipe[]>([]);

  useEffect(() => {
    fetchSelectedRecipe(params.id).then((values) => {
      const linked = params.id;
      Number(linked);
      setPost(values[Number(linked)]);
    });
  }, []);

  return (
    <div className={`${style.container} ${isDark ? style.darkContainer : ""}`}>
      <div className={style.wrapper}>
        {post
          ? post.map((item) => {
              return (
                <div key={item.id}>
                  <Recipe
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    title={item.title}
                    ingredients={item.ingredients}
                    quantity={item.quantity}
                  />
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};
