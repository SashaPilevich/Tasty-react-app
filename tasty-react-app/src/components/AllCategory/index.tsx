import { ChangeEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { CategoryList } from "../Category/List";
import { Preloader } from "../Preloader";
import { useDispatch, useSelector } from "react-redux";
import { TState } from "../../redux/store";
import { loadMorePosts } from "../../redux/actions/category";
import { IPost } from "../../types/post";
import { fetchSelectedCategory } from "../../api/recipe";
import { Input } from "../Input";
import { NotificationManager } from "react-notifications";
import style from "./style.module.css";

export const AllCategory = () => {
  const [searchText, setSearchText] = useState("");

  const categories = useSelector(
    (state: TState) => state.categoryReducer.allCategories
  );
  const isLoading = useSelector(
    (state: TState) => state.categoryReducer.isLoading
  );
  const showLoadMore = useSelector(
    (state: TState) => state.categoryReducer.showLoadMore
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backToMain = () => {
    navigate("/");
  };
  const loadMore = () => {
    dispatch(loadMorePosts() as any);
  };
  let searchItems: IPost[] = [];
  const hangleSearchText: ChangeEventHandler<HTMLInputElement> = (event) => {
    const text = event.target.value;
    setSearchText(text);
    let isList = localStorage.getItem("item");
    let arrList = [];
    if (isList) {
      arrList = JSON.parse(isList);
      arrList = arrList.map((item: IPost) => {
        return item;
      });
    }
    arrList.filter((item: IPost) => {
      if (text === item.title.toLowerCase().substring(0, 3)) {
        fetchSelectedCategory(item.id).then((values) => {
          if (item.id) {
            searchItems.push(values[item.id]);
            navigate(`/selected_category/${item.id}`);
          }
          return searchItems;
        });
        return searchItems;
      }
      if (text.length >= 4 && searchItems.length === 0) {
        navigate("/recipenotfound");
      }
    });
  };

  return (
    <>
      <div className={style.infoPanel}>
        <div className={style.forInput}>
          <Input
            value={searchText}
            onChange={hangleSearchText}
            uniqType="delivery"
            placeholder="Найди свой рецепт..."
          />
        </div>
        <h2 className={style.title}>КАТЕГОРИИ РЕЦЕПТОВ</h2>
      </div>
      {!isLoading ? (
        <div className={style.container}>
          <CategoryList posts={categories} />
          {showLoadMore ? (
            <Button
              label={"Загрузить ещё"}
              onClick={loadMore}
              type="btnCategory"
            />
          ) : (
            <Button label={"Выйти"} onClick={backToMain} type="btnCategory" />
          )}
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
};
