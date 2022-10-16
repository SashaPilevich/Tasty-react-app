import { Route, Routes } from "react-router-dom";
import { CategoryPage } from "../pages/CategoryPage";
import { RecipePage } from "../pages/RecipePage";
import { SelectedCategory } from "../pages/SelectedCategory";
import { MainPage } from "../pages/MainPage";

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/selected_category/:id" element={<SelectedCategory />} />
      <Route path="/selected_recipe/:id/" element={<RecipePage />} />
    </Routes>
  );
};
