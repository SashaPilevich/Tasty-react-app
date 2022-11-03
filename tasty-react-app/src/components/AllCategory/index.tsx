import { ChangeEventHandler, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { CategoryList } from "../Category/List";
import { Preloader } from "../Preloader";
import { useDispatch, useSelector } from "react-redux";
import { TState } from "../../redux/store";
import { Context } from "../../App";
import { loadMorePosts } from "../../redux/actions/category";
import { IPost } from "../../types/post";
import { fetchSelectedCategory } from "../../api/recipe";
import { SelectedCategory } from "../../pages/SelectedCategory";
import { Input } from "../Input";
import style from "./style.module.css";

export const AllCategory = () => {
  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState(false);
  const { user } = useContext(Context);

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
      if (text === item.title.toLowerCase()) {
        fetchSelectedCategory(item.id).then((values) => {
          if (item.id) {
            setSearch(true);
            searchItems.push(values[item.id]);
            navigate(`/selected_category/${item.id}`);
          }
          return searchItems;
        });
        setSearch(true);
        return searchItems;
      } else {
        setSearch(false);
      }
    });
  };

  return (
    <>
      {search ? (
        <SelectedCategory />
      ) : (
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
                <Button
                  label={"Выйти"}
                  onClick={backToMain}
                  type="btnCategory"
                />
              )}
            </div>
          ) : (
            <Preloader />
          )}
        </>
      )}
    </>
  );
};
