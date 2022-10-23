import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { CategoryList } from "../Category/List";
import { Preloader } from "../Preloader";
import { useSelector } from "react-redux";
import style from "./style.module.css";
import { TState } from "../../redux/store";
import { Context } from "../../App";
export const AllCategory = () => {
  const categories = useSelector(
    (state: TState) => state.categoryReducer.allCategories
  );
  const isLoading = useSelector(
    (state: TState) => state.categoryReducer.isLoading
  );

  const { user } = useContext(Context);
  const navigate = useNavigate();
  const backToMain = () => {
    navigate("/");
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
          <Button label={"Go Back"} onClick={backToMain} type="btnCategory" />
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
};
