import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSelectedCategory } from "../../api/recipe";
import { Context } from "../../App";
import { SelectedCategory } from "../../pages/SelectedCategory";
import { IPost } from "../../types/post";
import { AllCategory } from "../AllCategory";
import { Button } from "../Button";
import { CategorySelected } from "../CategorySelected";
import style from "./style.module.css";
import save from "./save.svg";
import like from "./like.svg";
import { LikedRecipe } from "../LikedRecipe";
import { useSelector, useDispatch } from "react-redux";
import { Like } from "../../assets";
import {
  loadAppCategories,
  setSelectedCategory,
} from "../../redux/actions/category";
import { TState } from "../../redux/store";
import { SavedRecipe } from "../SavedRecipe";
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
    return <LikedRecipe />;
  }
};

export const UsersTabs = () => {
  const dispatch = useDispatch();
  const { user } = useContext(Context);
  const [selectedTab, setSelectedTab] =
    useState<UsersTabs>("Selected Category");
  useEffect(() => {
    dispatch(loadAppCategories() as any);
  }, []);

  if (!user) {
    return <AllCategory />;
  }

  return (
    <Container>
      <div className={style.container}>
        <div className={style.tabContainer}>
          {/* <img className={style.ico} src={food} alt="food"></img> */}
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
          <Like fill={"rgb(94.509804%,76.862746%,5.882353%)"} />
          {/* <img className={style.ico} src={like} alt="like"></img> */}
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
