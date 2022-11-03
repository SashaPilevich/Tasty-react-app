import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSelectedRecipe } from "../../api/recipe";
import { Context } from "../../App";
import { Button } from "../../components/Button";
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
  const navigate = useNavigate();
  const navigateToShopList = (id: string | undefined) => {
    navigate(`/shoppinglist/${id}`);
  };
  return (
    <div className={`${style.container} ${isDark ? style.darkContainer : ""}`}>
      <div className={style.wrapper}>
        {post
          ? post.map((item) => {
              const clickPost = () => {
                navigateToShopList(item.id);
              };
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
                  <Button
                    label={"Добавить в шоппинг лист"}
                    onClick={clickPost}
                    type="btnShop"
                  />
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};
