import style from "./style.module.css";
import { picture1 } from "../../assets/";
import { ReactEventHandler, useState } from "react";
import { IRecipe } from "../../types/post";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

interface IProps extends IRecipe {
  onClickDelete?: (ingr: string) => void;
}

export const Recipe = (props: IProps) => {
  const [image, setImage] = useState(props.name);
  const [ingredients, setIngredients] = useState(props.ingredients);
  const [instructions, setInstructions] = useState(props.instructions);
  const [video, setVideo] = useState(props.video);
  const [quantity, setQuantity] = useState(props.quantity);
  const navigate = useNavigate();
  const handleError: ReactEventHandler<HTMLImageElement> = () => {
    setImage(picture1);
  };
  const clickDelete = (ingredient: string) => {
    const newList: string[] | undefined = ingredients?.filter((item) => {
      return item !== ingredient;
    });
    setIngredients(newList);
  };

  let myShopList: string[] = [];
  let shopList = localStorage.getItem("shopList");
  if (shopList) {
    myShopList = JSON.parse(shopList);
  }
  function unique(arr: string[]) {
    return Array.from(new Set(arr));
  }
  const clickSave = () => {
    ingredients?.map((item) => {
      myShopList.push(item);
      return myShopList;
    });
    NotificationManager.success(
      "Все ингредиенты сохранены в вашем шоппинг листе"
    );
    navigate("/myshoplist");
    localStorage.setItem("shopList", JSON.stringify(unique(myShopList)));
  };

  return (
    <>
      <h2 className={style.recipeTitle}>{props.title}</h2>
      <div className={style.recipeItem}>
        {image ? (
          <img
            className={style.recipeImage}
            src={props.name}
            alt={props.title}
            onError={handleError}
          />
        ) : (
          ""
        )}

        {ingredients ? (
          <div className={style.containerIngredients}>
            <div className={style.ingredients}>
              {props.onClickDelete ? (
                <>
                  {ingredients.map((item) => {
                    const deleteItem = () => {
                      clickDelete(item);
                    };

                    return (
                      <div className={style.controlIngredient}>
                        <p className={style.itemIngredientsInShop}>{item}</p>
                        <Button
                          label="X"
                          onClick={deleteItem}
                          type="btnDelete"
                        />
                      </div>
                    );
                  })}
                  <div className={style.btnContainer}>
                    <Button
                      label={"Save to my shopping list"}
                      onClick={clickSave}
                      type="btnSave"
                    />
                  </div>
                </>
              ) : (
                ingredients?.map((item) => {
                  return (
                    <div className={style.ingredients}>
                      <p className={style.itemIngredients}>{item}</p>
                    </div>
                  );
                })
              )}
            </div>
            <div className={style.quantity}>
              {quantity
                ? quantity.map((item) => {
                    return <p className={style.itemQuantity}>{item}</p>;
                  })
                : ""}
            </div>
          </div>
        ) : (
          ""
        )}
        {instructions ? (
          <div className={style.instructionsContainer}>
            {instructions
              ? instructions.map((item) => {
                  return <p className={style.itemInstructions}>{item}</p>;
                })
              : ""}
          </div>
        ) : (
          ""
        )}

        <div className={style.videoContainer}>
          {video ? (
            <iframe
              className={style.video}
              src={props.video}
              frameBorder="10px"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
              height={"400px"}
              width={"800px"}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
