import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSelectedCategory } from "../../api/recipe";
import { Context } from "../../App";
import { CategorySelected } from "../../components/CategorySelected";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { UsersTabs } from "../../components/UsersTab";
import { IPost } from "../../types/post";
import { useSelector, useDispatch } from "react-redux";
import { TState } from "../../redux/store";
import { setSelectedCategory } from "../../redux/actions/category";

export const SelectedCategory = () => {
  const selectedCategory = useSelector(
    (state: TState) => state.categoryReducer.selectedCategory
  );
  const dispatch = useDispatch();
  const params: any = useParams();
  useEffect(() => {
    fetchSelectedCategory(params.id).then((values) => {
      dispatch(setSelectedCategory(values[params.id]));
    });
  }, []);
  // const [selectedCategory, setSelectedCategory] = useState<IPost[]>([]);

  // useEffect(() => {
  //   fetchSelectedCategory(params.id).then((values) => {
  //     setSelectedCategory(values[params.id]);
  //   });
  // }, []);

  return (
    <Container>
      <Header />
      <CategorySelected posts={selectedCategory} />
    </Container>
  );
};
