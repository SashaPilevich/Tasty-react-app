import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSelectedCategory } from "../../api/recipe";
import { CategorySelected } from "../../components/CategorySelected";
import { Header } from "../../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { TState } from "../../redux/store";
import { setSelectedCategory } from "../../redux/actions/category";
import { MainContainer } from "../../components/MainContainer";

export const SelectedCategory = () => {
  const selectedCategory = useSelector(
    (state: TState) => state.categoryReducer.recipiesOfSelectedCategory
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
    <MainContainer>
      <Header />
      <CategorySelected posts={selectedCategory} />
    </MainContainer>
  );
};
