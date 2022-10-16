import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPost } from "../../types/post";
import { Button } from "../Button";
import { CategoryList } from "../Category/List";
import style from "./style.module.css";

export const AllCategory = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  //принимает в себя id айтема из PostList (когда проходимся map) по которому кликнули
  const navigateToFullPost = (id: number) => {
    //тут мы передаём этот id в url и так происходит переход на selectedpost и показывает нужный пост по id
    navigate(`/selected_category/${id}`);
  };

  useEffect(() => {
    setIsLoading(true);
    const promise = fetch(
      "https://62b0c0c4e460b79df04c901b.mockapi.io/api/selected"
    );
    promise
      .then((response) => {
        return response.json();
      })
      .then((values) => {
        setPosts(values);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const backToMain = () => {
    navigate("/");
  };

  return (
    <>
      <div className={style.infoPanel}>
        <h2 className={style.title}>CATEGORY</h2>
      </div>
      {!isLoading ? (
        <div className={style.container}>
          <CategoryList posts={posts} onClickPost={navigateToFullPost} />
          <Button label={"Go Back"} onClick={backToMain} type="btnCategory" />
        </div>
      ) : (
        <div className={style.spinWrapper}>
          <div className={style.spinner}></div>
        </div>
      )}
    </>
  );
};
