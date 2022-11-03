import { useSelector } from "react-redux";
import { TState } from "../../redux/store";
import { CategorySelected } from "../CategorySelected";
import { Container } from "../Container";

export const SavedRecipe = () => {
  const recipes = useSelector(
    (state: TState) => state.categoryReducer.savedRecipes
  );
  return (
    <Container>
      <CategorySelected posts={recipes} isLikeSave={true} />;
    </Container>
  );
};
