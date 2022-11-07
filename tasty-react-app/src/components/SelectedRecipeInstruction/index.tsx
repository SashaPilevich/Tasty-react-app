import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSelectedRecipe } from "../../api/recipe";
import { Context } from "../../App";
import { IRecipe } from "../../types/post";
import { Button } from "../Button";
import { Recipe } from "../Recipe";
import style from "./style.module.css";

export const SelectedRecipeInstruction = () => {
  const { isDark } = useContext(Context);

  const params: any = useParams();
  const [post, setPost] = useState<IRecipe[]>([]);

  useEffect(() => {
    fetchSelectedRecipe(params.id).then((values) => {
      setPost(values[params.id]);
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
