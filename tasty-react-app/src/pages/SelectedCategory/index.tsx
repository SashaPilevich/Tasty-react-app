import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSelectedCategory } from "../../api/recipe";
import { CategorySelected } from "../../components/CategorySelected";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { TState } from "../../redux/store";
import { setSelectedCategory } from "../../redux/actions/category";

export const SelectedCategory = () => {
  const selectedCategory = useSelector(
    (state: TState) => state.categoryReducer.selectCategory
  );

  const dispatch = useDispatch();
  const params: any = useParams();
  useEffect(() => {
    dispatch(setSelectedCategory([]));
    fetchSelectedCategory(params.id).then((values) => {
      dispatch(setSelectedCategory(values[params.id]));
    });
  }, []);

  return (
    <Container>
      <Header />
      <CategorySelected posts={selectedCategory} />
    </Container>
  );
};
