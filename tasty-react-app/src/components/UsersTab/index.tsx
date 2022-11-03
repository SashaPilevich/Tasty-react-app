import { useContext, useEffect, useState } from "react";
import { Context } from "../../App";
import { AllCategory } from "../AllCategory";
import { Button } from "../Button";
import style from "./style.module.css";
import save from "./save.svg";
import { LikedRecipes } from "../LikedRecipes";
import { useDispatch } from "react-redux";
import { Like } from "../../assets";
import { loadAppCategories } from "../../redux/actions/category";
import { SavedRecipe } from "../SavedRecipes";
import { Container } from "../Container";

type UsersTabs = "Selected Category" | "Saved Recipies" | "Liked Recipies";
export const getUsersTabList = (tab: UsersTabs) => {
  if (tab === "Selected Category") {
    return <AllCategory />;
  }
  if (tab === "Saved Recipies") {
    return <SavedRecipe />;
  }
  if (tab === "Liked Recipies") {
    return <LikedRecipes />;
  }
};

export const UsersTabs = () => {
  const dispatch = useDispatch();
  const { user } = useContext(Context);
  const [selectedTab, setSelectedTab] =
    useState<UsersTabs>("Selected Category");
  useEffect(() => {
    dispatch(loadAppCategories(1) as any);
  }, []);

  if (!user) {
    return <AllCategory />;
  }

  return (
    <Container>
      <div className={style.container}>
        <div className={style.tabContainer}>
          <Button
            label={"Все категории"}
            onClick={() => {
              setSelectedTab("Selected Category");
            }}
            type={
              selectedTab === "Selected Category"
                ? "btnTabActive"
                : "btnTabUnactive"
            }
          />
        </div>
        <div className={style.tabContainer}>
          <img className={style.ico} src={save} alt="save"></img>
          <Button
            label={"Сохранённые рецепты"}
            onClick={() => {
              setSelectedTab("Saved Recipies");
            }}
            type={
              selectedTab === "Saved Recipies"
                ? "btnTabActive"
                : "btnTabUnactive"
            }
          />
        </div>
        <div className={style.tabContainer}>
          <Like
            className={style.like}
            fill={"rgb(94.509804%,76.862746%,5.882353%)"}
          />
          <Button
            label={"Понравившиеся рецепты"}
            onClick={() => {
              setSelectedTab("Liked Recipies");
            }}
            type={
              selectedTab === "Liked Recipies"
                ? "btnTabActive"
                : "btnTabUnactive"
            }
          />
        </div>
      </div>
      {getUsersTabList(selectedTab)}
    </Container>
  );
};
