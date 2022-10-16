import style from "./style.module.css";
import { picture1 } from "../../assets/";

import { ReactEventHandler, useState } from "react";
import { IRecipe } from "../../types/post";
import { Button } from "../Button";

interface IProps extends IRecipe {
  onClickDelete?: (ingr: string) => void;
}

export const Recipe = (props: IProps) => {
  const [image, setImage] = useState(props.name);
  const [ingredients, setIngredients] = useState(props.ingredients);
  const [instructions, setInstructions] = useState(props.instructions);
  const [video, setVideo] = useState(props.video);
  const [quantity, setQuantity] = useState(props.quantity);
  const handleError: ReactEventHandler<HTMLImageElement> = () => {
    setImage(picture1);
  };
  const clickDelete = (ingr: string) => {
    const newList: string[] | undefined = ingredients?.filter((item) => {
      if (item === ingr) {
        return false;
      }
      return true;
    });
    setIngredients(newList);
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
              {props.onClickDelete
                ? ingredients.map((item) => {
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
                  })
                : ingredients?.map((item) => {
                    return (
                      <div className={style.ingredients}>
                        <p className={style.itemIngredients}>{item}</p>
                      </div>
                    );
                  })}
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
