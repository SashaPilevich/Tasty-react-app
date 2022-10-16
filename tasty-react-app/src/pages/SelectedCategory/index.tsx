import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../App";
import { CategorySelected } from "../../components/CategorySelected";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { IPost } from "../../types/post";

export const SelectedCategory = () => {
  const { isDark } = useContext(Context);
  const [posts, setPosts] = useState<IPost[]>([]);
  const navigate = useNavigate();
  //принимает в себя id айтема из PostList (когда проходимся map) по которому кликнули
  const navigateToFullPost = (id: number) => {
    //тут мы передаём этот id в url и так происходит переход на selectedpost и показывает нужный пост по id
    navigate(`/selected_recipe/${id}`);
  };

  const params: any = useParams(); //показывает какие параметры переданы через url-т.е. то что в роуте написано после двоеточия

  useEffect(() => {
    const promise = fetch(
      `https://62b0c0c4e460b79df04c901b.mockapi.io/api/selected/${params.id}` //тут запрашиваем всю инфу по переданному id из item и потом navigatetofullpost
    );
    promise
      .then((response) => {
        return response.json();
      })
      .then((values) => {
        setPosts(values[params.id]);
      });
  }, []);

  return (
    <Container>
      <Header />
      <CategorySelected posts={posts} onClickPost={navigateToFullPost} />
    </Container>
  );
};
