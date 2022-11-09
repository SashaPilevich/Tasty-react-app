import { picture } from "../../assets/";
import { ReactEventHandler, useContext, useState } from "react";
import { IRecipe } from "../../types/post";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";
import { Context } from "../../App";
import { useDispatch } from "react-redux";
import { loadShop } from "../../redux/actions/category";
import { IngredientForShop } from "../IngredientForShop";
import style from "./style.module.css";

function unique(arr: string[]) {
  return Array.from(new Set(arr));
}

interface IProps extends IRecipe {
  onClickDelete?: (ingredient: string) => void;
}

export const Recipe = (props: IProps) => {
  const [image, setImage] = useState(props.name);
  const [ingredients, setIngredients] = useState(props.ingredients);
  const { isDark } = useContext(Context);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleError: ReactEventHandler<HTMLImageElement> = () => {
    setImage(picture);
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

  const clickSave = () => {
    if (ingredients) {
      ingredients.forEach((item) => {
        myShopList.push(item);
      });
    }
    NotificationManager.success(
      "Все ингредиенты сохранены в вашем шоппинг листе"
    );
    navigate("/myshoplist");
    localStorage.setItem("shopList", JSON.stringify(unique(myShopList)));
    dispatch(loadShop() as any);
  };

  return (
    <>
      {ingredients ? (
        <div className={style.ingredientsShop}>
          {props.onClickDelete ? (
            <>
              {ingredients.map((item, index) => {
                const deleteItem = () => {
                  clickDelete(item);
                };
                return (
                  <IngredientForShop
                    ingredient={item}
                    onClick={deleteItem}
                    key={index}
                  />
                );
              })}
              <div className={style.btnContainer}>
                <Button
                  label={"Сохранить"}
                  onClick={clickSave}
                  type="btnSave"
                />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
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
            {props.onClickDelete ? (
              ""
            ) : (
              <div className={style.ingredients}>
                {ingredients?.map((item, index) => {
                  return (
                    <div key={index}>
                      <p
                        key={index}
                        className={`${style.itemIngredients} ${
                          isDark ? style.darkItem : style.itemIngredients
                        }`}
                      >
                        {item}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            <div className={style.quantity}>
              {props.quantity
                ? props.quantity.map((item, index) => {
                    return (
                      <p className={style.itemQuantity} key={index}>
                        {item}
                      </p>
                    );
                  })
                : ""}
            </div>
          </div>
        ) : (
          ""
        )}
        {props.instructions ? (
          <div className={style.instructionsContainer}>
            {props.instructions
              ? props.instructions.map((item, index) => {
                  return (
                    <p
                      className={`${
                        isDark
                          ? style.darkItemInstructions
                          : style.itemInstructions
                      }`}
                      key={index}
                    >
                      {item}
                    </p>
                  );
                })
              : ""}
          </div>
        ) : (
          ""
        )}

        <div className={style.videoContainer}>
          {props.video ? (
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
