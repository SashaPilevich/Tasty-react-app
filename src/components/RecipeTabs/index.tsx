import { useState } from "react";
import { Button } from "../Button";
import { shopList, food, note, movie } from "../../assets";
import { SelectedRecipe } from "../SelectedRecipe";
import { SelectedRecipeInstruction } from "../SelectedRecipeInstruction";
import { SelectedRecipeVideo } from "../SelectedRecipeVideo";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TState } from "../../redux/store";
import style from "./style.module.css";

type Tabs = "Ingredients" | "Instruction" | "Video" | "Shop";
export const getTabList = (tab: Tabs) => {
  if (tab === "Ingredients") {
    return <SelectedRecipe />;
  }
  if (tab === "Instruction") {
    return <SelectedRecipeInstruction />;
  }
  if (tab === "Video") {
    return <SelectedRecipeVideo />;
  }
  if (tab === "Shop") {
    return <SelectedRecipeVideo />;
  }
};
export const RecipeTabs = () => {
  const [selectedTab, setSelectedTab] = useState<Tabs>("Ingredients");
  const recipe = useSelector((state: TState) => state.categoryReducer.recipe);
  const navigate = useNavigate();
  const navigateToShopList = (id: string | undefined) => {
    navigate(`/shoppinglist/${id}`);
  };
  const clickPost = () => {
    {
      recipe.forEach((item) => {
        navigateToShopList(item.id);
      });
    }
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.tabContainer}>
          <img className={style.ico} src={food} alt="food"></img>
          <Button
            label={"Ингредиенты"}
            onClick={() => {
              setSelectedTab("Ingredients");
            }}
            type={
              selectedTab === "Ingredients" ? "btnTabActive" : "btnTabUnactive"
            }
          />
        </div>
        <div className={style.tabContainer}>
          <img className={style.ico} src={note} alt="note"></img>
          <Button
            label={"Инструкция"}
            onClick={() => {
              setSelectedTab("Instruction");
            }}
            type={
              selectedTab === "Instruction" ? "btnTabActive" : "btnTabUnactive"
            }
          />
        </div>
        <div className={style.tabContainer}>
          <img className={style.ico} src={movie} alt="movie"></img>
          <Button
            label={"Видео рецепта"}
            onClick={() => {
              setSelectedTab("Video");
            }}
            type={selectedTab === "Video" ? "btnTabActive" : "btnTabUnactive"}
          />
        </div>
        <div className={style.tabContainer}>
          <img className={style.ico} src={shopList} alt="shopList"></img>

          <Button
            label={"Добавить в список ингредиентов"}
            onClick={clickPost}
            type={selectedTab === "Shop" ? "btnTabActive" : "btnTabUnactive"}
          />
        </div>
      </div>
      {getTabList(selectedTab)}
    </>
  );
};
