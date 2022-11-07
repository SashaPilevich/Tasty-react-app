import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSelectedRecipe } from "../../api/recipe";
import { IRecipe } from "../../types/post";
import { Button } from "../Button";
import { Header } from "../Header";
import { Recipe } from "../Recipe";
import style from "./style.module.css";

export const ShoppingList = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState<IRecipe[]>([]);
  useEffect(() => {
    fetchSelectedRecipe(params.id).then((values) => {
      setPost(values[Number(params.id)]);
    });
  }, []);
  const goBack = () => {
    navigate(-1);
  };
  const goToShopList = () => {
    navigate("/myshoplist");
  };
  return (
    <div className={style.container}>
      {post.length !== 0
        ? post.map((item) => {
            return (
              <>
                <Header />
                <div className={style.btnPanel}>
                  <div className={style.forBtnBack}>
                    <Button label={"Назад"} onClick={goBack} type="btnBack" />
                  </div>
                  <div className={style.forBtnShopList}>
                    <Button
                      label={"Шоппинг лист"}
                      onClick={goToShopList}
                      type="btnShopList"
                    />
                  </div>
                </div>
                <h2 className={style.title}>Шоппинг лист</h2>
                <Recipe
                  key={item.id}
                  id={item.id}
                  ingredients={item.ingredients}
                  onClickDelete={() => {}}
                />
              </>
            );
          })
        : ""}
    </div>
  );
};
