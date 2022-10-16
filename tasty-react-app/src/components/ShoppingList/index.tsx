import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSelectedRecipe } from "../../api/recipe";

import { TState } from "../../redux/store";
import { IPost, IRecipe } from "../../types/post";
import { Button } from "../Button";
import { Container } from "../Container";
import { Header } from "../Header";
import { Recipe } from "../Recipe";
import style from "./style.module.css";

export const ShoppingList = () => {
  const params = useParams(); //показывает какие параметры переданы через url-т.е. то что в роуте написано после двоеточия
  const [post, setPost] = useState<IRecipe[]>([]);
  useEffect(() => {
    fetchSelectedRecipe(params.id).then((values) => {
      const linked = params.id;
      Number(linked);
      setPost(values[Number(linked)]);
    });
  }, []);

  return (
    <div>
      {post.length !== 0
        ? post.map((item) => {
            return (
              <Container>
                <Header />
                <h2 className={style.title}>Shopping list</h2>
                <Recipe
                  key={item.id}
                  id={item.id}
                  ingredients={item.ingredients}
                  onClickDelete={() => {}}
                />
                <Button label={"BUY"} onClick={() => {}} type="btnShop" />
              </Container>
            );
          })
        : ""}
    </div>
  );
};
