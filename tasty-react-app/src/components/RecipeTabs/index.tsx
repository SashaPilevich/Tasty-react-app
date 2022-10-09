import { useState } from "react";
import { Button } from "../Button";
import style from "./style.module.css";
import food from "./food.png";
import note from "./note.png";
import movie from "./movie.png";
import { SelectedRecipe } from "../SelectedRecipe";
import { SelectedRecipeInstruction } from "../SelectedRecipeInstruction";
import { SelectedRecipeVideo } from "../SelectedRecipeVideo";

type Tabs = "Ingredients" | "Instruction" | "Video";
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
};
export const RecipeTabs = () => {
  const [selectedTab, setSelectedTab] = useState<Tabs>("Ingredients");

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
      </div>
      {getTabList(selectedTab)}
    </>
  );
};
