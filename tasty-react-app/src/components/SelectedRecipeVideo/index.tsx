import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSelectedRecipe } from "../../api/recipe";
import { Context } from "../../App";
import { IRecipe } from "../../types/post";
import { Recipe } from "../Recipe";
import style from "./style.module.css";

export const SelectedRecipeVideo = () => {
  const { isDark } = useContext(Context);

  const params: any = useParams();
  const [post, setPost] = useState<IRecipe[]>([]);

  useEffect(() => {
    fetchSelectedRecipe(params.id).then((values) => {
      console.log(values[params.id]);
      setPost(values[params.id]);
    });
  }, []);

  return (
    <div className={`${style.container} ${isDark ? style.darkContainer : ""}`}>
      <div className={style.wrapper}>
        {post
          ? post.map((item) => {
              return (
                <Recipe
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  video={item.video}
                />
              );
            })
          : ""}
      </div>
    </div>
  );
};
