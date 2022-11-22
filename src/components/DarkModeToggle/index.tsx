import style from "./style.module.css";

interface IProps {
  inputChecked: boolean;
  onChange: () => void;
}
export const DarkModeToggle = ({ inputChecked, onChange }: IProps) => {
  return (
    <div className={style.switchCheckbox}>
      <label className={style.switch}>
        <input
          type="checkbox"
          onChange={onChange}
          checked={inputChecked}
          placeholder="checkbox"
        />
        <span className={style.slider}></span>
      </label>
    </div>
  );
};
