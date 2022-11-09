import { Header } from "../../components/Header";
import { Container } from "../../components/Container";
import { UsersTabs } from "../../components/UsersTab";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import style from "./style.module.css";

export const CategoryPage = () => {
  const navigate = useNavigate();
  const backToMain = () => {
    navigate("/");
  };
  return (
    <Container>
      <Header />
      <div className={style.forBtnBack}>
        <Button label={"Выйти"} onClick={backToMain} type="btnBack" />
      </div>
      <UsersTabs />
    </Container>
  );
};
