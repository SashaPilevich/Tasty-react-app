import { useSelector } from "react-redux";
import { TState } from "../../redux/store";
import { CategorySelected } from "../CategorySelected";
import { Container } from "../Container";
import { Header } from "../Header";

export const SavedRecipe = () => {
  const recipe = useSelector(
    (state: TState) => state.categoryReducer.savedRecipe
  );
  return (
    <Container>
      <CategorySelected posts={recipe} isLikeSave={true} />;
    </Container>
  );
};
