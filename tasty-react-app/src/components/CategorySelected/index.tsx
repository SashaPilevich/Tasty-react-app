import { IPost } from "../../types/post";
import style from "./style.module.css";
import { ItemOfCategory } from "../Category/Item";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { MainContainer } from "../MainContainer";
import { LikedRecipes } from "../LikedRecipes";

export interface IProps {
  posts: IPost[];
  isLikeSave?: boolean;
}
export const CategorySelected = (props: IProps) => {
  const navigate = useNavigate();

  const backToAllPost = () => {
    navigate("/category");
  };
  const goToShopList = () => {
    navigate("/myshoplist");
  };
  const navigateToSelectedRecipe = (id: string | undefined) => {
    navigate(`/selected_recipe/${id}`);
  };

  return (
    <div className={style.mainContainer}>
      {props.isLikeSave ? (
        ""
      ) : (
        <div className={style.btnPanel}>
          <div className={style.forBtnBack}>
            <Button label={"Назад"} onClick={backToAllPost} type="btnBack" />
          </div>
          <div className={style.forBtnShopList}>
            <Button
              label={"Шоппинг лист"}
              onClick={goToShopList}
              type="btnShopList"
            />
          </div>
        </div>
      )}

      <div
        className={`${
          props.isLikeSave ? style.LikeSaveContainer : style.container
        }`}
      >
        {props.posts.map((item) => {
          const clickPost = () => {
            navigateToSelectedRecipe(item.id);
          };
          return (
            <div className={style.wrapper} key={item.id}>
              <ItemOfCategory
                isSelected={true}
                isCategory={true}
                key={item.id}
                id={item.id}
                name={item.name}
                title={item.title}
                back={item.back}
                time={item.time}
                kcal={item.kcal}
                liked={item.liked}
                saved={item.saved}
              />
              <Button
                label={"Готовить"}
                onClick={clickPost}
                type="btnShowMore"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
