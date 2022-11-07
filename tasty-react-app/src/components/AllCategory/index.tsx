import { ChangeEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { CategoryList } from "../Category/List";
import { Preloader } from "../Preloader";
import { useDispatch, useSelector } from "react-redux";
import { TState } from "../../redux/store";
import {
  loadAppCategories,
  loadMorePosts,
  setAllCategories,
  setShowLoadMore,
} from "../../redux/actions/category";
import { IPost } from "../../types/post";
import { fetchSelectedCategory } from "../../api/recipe";
import { Input } from "../Input";
import style from "./style.module.css";
import { Container } from "../Container";

export const AllCategory = () => {
  const [searchText, setSearchText] = useState("");
  const [isFind, setIsFind] = useState(true);

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

  const loadMore = () => {
    dispatch(loadMorePosts() as any);
  };
  let searchItems: IPost[] = [];
  const hangleSearchText: ChangeEventHandler<HTMLInputElement> = (event) => {
    const text = event.target.value;
    setSearchText(text);
    let isList = localStorage.getItem("items");
    let arrList = [];
    if (isList) {
      arrList = JSON.parse(isList);
    }
    searchItems = arrList.filter((item: IPost) => {
      if (text === item.title.toLowerCase()) {
        searchItems.push(item);
        setIsFind(true);
        dispatch(setShowLoadMore(false));
        return dispatch(setAllCategories(searchItems));
      }
      if (searchItems.length === 0) {
        setIsFind(false);
      }
    });

    if (text.length === 0) {
      setIsFind(true);
      dispatch(loadAppCategories(1) as any);
    }
  };

  return (
    <Container>
      <div className={style.infoPanel}>
        <div className={style.forInput}>
          <Input
            value={searchText}
            onChange={hangleSearchText}
            uniqType="delivery"
            placeholder=" Найди свой рецепт..."
          />
        </div>
        {isFind ? "" : <h2 className={style.notFind}>Ничего не найдено...</h2>}
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
          ) : null}
        </div>
      ) : (
        <Preloader />
      )}
    </Container>
  );
};
