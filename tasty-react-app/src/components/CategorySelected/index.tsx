import { IPost } from "../../types/post";
import style from "./style.module.css";
import { ItemOfCategory } from "../Category/Item";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

export interface IProps {
  posts: IPost[];
  onClickPost: (id: number) => void; //принимает id-это связь с allposts для того чтобы мы знали на какой пост произошел клик
}
export const CategorySelected = (props: IProps) => {
  const navigate = useNavigate();
  const backToAllPost = () => {
    navigate("/category");
    // setShowLoadMore(true);
  };
  return (
    <div className={style.mainContainer}>
      <Button label={"Back"} onClick={backToAllPost} type="btnBack" />
      <div className={style.container}>
        {props.posts.map((item) => {
          //тут создаём функцию чтобы каждая отдельная функция была навешена на каждый отдельный пост
          // props onClickPost === navigateToFullPost from allPost
          const clickPost = () => {
            //функция обертка
            props.onClickPost(item.id);
          };
          return (
            <>
              {/* //с помощью этой функции сохраняется и передаётся нужный id
              //clickPost вызовет onClickPost и он отработает как
              navigateToFullPost */}
              <div className={style.wrapper} onClick={clickPost}>
                <ItemOfCategory
                  isSelected={true}
                  isCategory={true}
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  title={item.title}
                  time={item.time}
                  kcal={item.kcal}
                />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
