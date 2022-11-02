import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TState } from "../../redux/store";
import { ItemOfCategory } from "../Category/Item";
import { CategoryList } from "../Category/List";
import { CategorySelected } from "../CategorySelected";
import { Container } from "../Container";

export const LikedRecipes = () => {
  const recipes = useSelector(
    (state: TState) => state.categoryReducer.likedRecipes
  );
  return (
    <Container>
      <CategorySelected posts={recipes} isLikeSave={true} />
    </Container>
  );
};
