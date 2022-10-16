import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TState } from "../../redux/store";
import { ItemOfCategory } from "../Category/Item";
import { CategoryList } from "../Category/List";
import { CategorySelected } from "../CategorySelected";
import { Container } from "../Container";

export const LikedRecipe = () => {
  const recipe = useSelector(
    (state: TState) => state.categoryReducer.likedRecipe
  );
  return (
    <Container>
      <CategorySelected posts={recipe} isLikeSave={true} />
    </Container>
  );
};
