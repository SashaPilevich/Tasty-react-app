import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { MainContainer } from "../../components/MainContainer";
import { RecipeTabs } from "../../components/RecipeTabs";
import { ButtonPanel } from "../../components/ButtonPanel";

export const RecipePage = () => {
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(-1);
  };
  return (
    <MainContainer>
      <Header />
      <ButtonPanel onClick={navigateBack} />
      <RecipeTabs />
    </MainContainer>
  );
};
