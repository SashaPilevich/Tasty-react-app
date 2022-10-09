import { IPost } from "../../../types/post";
import { ItemOfCategory } from "../Item";
import style from "./style.module.css";

export interface IProps {
  posts: IPost[];
  onClickPost: (id: number) => void; //принимает id-это связь с allposts для того чтобы мы знали на какой пост произошел клик
}
export const CategoryList = (props: IProps) => {
  return (
    <div className={style.container}>
      {props.posts.map((item) => {
        //тут создаём функцию чтобы каждая отдельная функция была навешена на каждый отдельный пост
        //props onClickPost === navigateToFullPost from allPost
        const clickPost = () => {
          //функция обертка
          props.onClickPost(item.id);
        };
        return (
          //с помощью этой функции сохраняется и передаётся нужный id
          //clickPost вызовет onClickPost и он отработает как navigateToFullPost
          <div onClick={clickPost}>
            <ItemOfCategory
              key={item.id}
              id={item.id}
              name={item.name}
              title={item.title}
            />
          </div>
        );
      })}
    </div>
  );
};
