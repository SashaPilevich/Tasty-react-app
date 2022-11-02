import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { CategoryList } from "../Category/List";
import { Preloader } from "../Preloader";
import { useDispatch, useSelector } from "react-redux";
import style from "./style.module.css";
import { TState } from "../../redux/store";
import { Context } from "../../App";
import { loadMorePosts } from "../../redux/actions/category";
export const AllCategory = () => {
  const categories = useSelector(
    (state: TState) => state.categoryReducer.allCategories
  );
  const isLoading = useSelector(
    (state: TState) => state.categoryReducer.isLoading
  );
  const showLoadMore = useSelector(
    (state: TState) => state.categoryReducer.showLoadMore
  );

  const { user } = useContext(Context);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backToMain = () => {
    navigate("/");
  };
  const loadMore = () => {
    dispatch(loadMorePosts() as any);
  };

  return (
    <>
      <div className={style.infoPanel}>
        <h2 className={`${style.title} ${user ? style.userTitle : ""}`}>
          CATEGORY
        </h2>
      </div>
      {!isLoading ? (
        <div className={style.container}>
          <CategoryList posts={categories} />
          {showLoadMore ? (
            <Button label={"Load More"} onClick={loadMore} type="btnCategory" />
          ) : (
            <Button label={"Go Back"} onClick={backToMain} type="btnCategory" />
          )}
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
};
