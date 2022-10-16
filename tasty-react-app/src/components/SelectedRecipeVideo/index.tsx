import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../App";
import { Button } from "../../components/Button";
import { IPost, IRecipe } from "../../types/post";
import { Recipe } from "../Recipe";
import { RecipeTabs } from "../RecipeTabs";
import style from "./style.module.css";

export const SelectedRecipeVideo = () => {
  const { isDark } = useContext(Context);

  const params: any = useParams(); //показывает какие параметры переданы через url-т.е. то что в роуте написано после двоеточия
  const [post, setPost] = useState<IRecipe[]>([]);

  useEffect(() => {
    const promise = fetch(
      `https://62b0c0c4e460b79df04c901b.mockapi.io/api/selected/${params.id}/category` //тут запрашиваем всю инфу по переданному id из item и потом navigatetofullpost
    );

    promise
      .then((response) => {
        return response.json();
      })
      .then((values) => {
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
                <>
                  <Recipe
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    video={item.video}
                  />
                </>
              );
            })
          : ""}
      </div>
    </div>
  );
};
