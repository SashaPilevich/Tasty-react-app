import { useSelector } from "react-redux";
import { TState } from "../../redux/store";
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
