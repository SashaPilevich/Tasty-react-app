import style from "./style.module.css";
interface ICount {
  count: number;
  decrement: (id: number) => void;
  id: number;
  increment: (id: number) => void;
}
export const Count = (props: ICount) => {
  return (
    <div className={style.counter}>
      <button onClick={() => props.decrement(props.id)}>-</button>
      <p>{props.count}</p>

      <button onClick={() => props.increment(props.id)}>+</button>
    </div>
  );
};
