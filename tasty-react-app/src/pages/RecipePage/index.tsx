import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { MainContainer } from "../../components/MainContainer";
import { RecipeTabs } from "../../components/RecipeTabs";
import style from "./style.module.css";

export const RecipePage = () => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };
  const goToShopList = () => {
    navigate("/myshoplist");
  };
  return (
    <MainContainer>
      <Header />
      <div className={style.btnPanel}>
        <div className={style.forBtnBack}>
          <Button label={"Назад"} onClick={navigateBack} type="btnBack" />
        </div>
        <div className={style.forBtnShopList}>
          <Button
            label={"Шоппинг лист"}
            onClick={goToShopList}
            type="btnShopList"
          />
        </div>
      </div>
      <RecipeTabs />
    </MainContainer>
  );
};
