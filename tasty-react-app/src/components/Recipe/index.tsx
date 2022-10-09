import style from "./style.module.css";
import { picture1 } from "../../assets/";

import { ReactEventHandler, useState } from "react";
import { IRecipe } from "../../types/post";
import { Button } from "../Button";
import { RecipeTabs } from "../RecipeTabs";

export const Recipe = (props: IRecipe) => {
  const [image, setImage] = useState(props.name);
  const [ingredients, setIngredients] = useState(props.ingredients);
  const [instructions, setInstructions] = useState(props.instructions);
  const [video, setVideo] = useState(props.video);
  const [quantity, setQuantity] = useState(props.quantity);
  const handleError: ReactEventHandler<HTMLImageElement> = () => {
    setImage(picture1);
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
          // <img className={style.recipeImage} src={picture1} alt={props.title} />
        )}

        {ingredients ? (
          <div className={style.containerIngredients}>
            <div className={style.ingredients}>
              {ingredients ? (
                <h3 className={style.titleIngredients}>Ингредиенты</h3>
              ) : (
                ""
              )}
              {ingredients
                ? ingredients.map((item) => {
                    return <p className={style.itemIngredients}>{item}</p>;
                  })
                : ""}
              {ingredients ? (
                <Button
                  label={"Add shopping list"}
                  onClick={() => {}}
                  type="btnShop"
                />
              ) : (
                ""
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
