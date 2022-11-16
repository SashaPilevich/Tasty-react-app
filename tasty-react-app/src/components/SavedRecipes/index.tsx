import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Context } from "../../App";
import { TState } from "../../redux/store";
import { CategorySelected } from "../CategorySelected";
import { Modal } from "../Modal";
import style from "./style.module.css";

export const SavedRecipe = () => {
  const { isDark } = useContext(Context);
  const [isEmpty, setIsEmpty] = useState(true);
  const recipes = useSelector(
    (state: TState) => state.categoryReducer.savedRecipes
  );
  useEffect(() => {
    if (recipes.length !== 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, []);
  return (
    <div className={`${isDark ? style.darkMain : style.main}`}>
      {isEmpty ? (
        <Modal active={isEmpty} setActive={setIsEmpty}>
          <div className={style.container}>
            <p className={style.modalText}>Ваш список</p>
            <p className={style.modalText}>сохранённых рецептов</p>
            <p className={style.modalText}>пока что пуст...</p>
          </div>
        </Modal>
      ) : (
        <CategorySelected posts={recipes} isLikeSave={true} />
      )}
    </div>
  );
};
