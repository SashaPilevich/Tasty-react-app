import { useNavigate } from "react-router-dom";
import { IPost } from "../../../types/post";
import { ItemOfCategory } from "../Item";
import style from "./style.module.css";

export interface IProps {
  posts: IPost[];
}
export const CategoryList = (props: IProps) => {
  const navigate = useNavigate();
  const navigateToSelectedCategory = (id: string | undefined) => {
    navigate(`/selected_category/${id}`);
  };

  return (
    <div className={style.container}>
      {props.posts.map((item) => {
        const clickPost = () => {
          navigateToSelectedCategory(item.id);
        };
        return (
          <div className={style.wrapper} onClick={clickPost} key={item.id}>
            <ItemOfCategory
              key={item.id}
              id={item.id}
              name={item.name}
              title={item.title}
              back={item.back}
            />
          </div>
        );
      })}
    </div>
  );
};
