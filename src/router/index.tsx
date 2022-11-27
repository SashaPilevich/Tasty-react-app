import { Navigate, Route, Routes } from "react-router-dom";
import { CategoryPage } from "../pages/CategoryPage";
import { RecipePage } from "../pages/RecipePage";
import { SelectedCategory } from "../pages/SelectedCategory";
import { MainPage } from "../pages/MainPage";
import { LoginPage } from "../pages/Login";
import { RegistrationPage } from "../pages/RegistrationPage";
import { ReactNode, useContext } from "react";
import { Context } from "../App";
import { ResetPassword } from "../pages/ResetPassword";
import { SavedRecipe } from "../components/SavedRecipes";
import { ShoppingList } from "../components/ShoppingList";
import { Error } from "../pages/Error";
import { MyShoppingList } from "../components/MyShoppingList";
import { ShopPage } from "../pages/ShopPage";
import { DeliveryPage } from "../pages/DeliveryPage";

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/selected_category/:id" element={<SelectedCategory />} />
      <Route
        path="/selected_recipe/:id/"
        element={useLoginGuard(<RecipePage />)}
      />
      <Route path="/saverecipe" element={<SavedRecipe />} />
      <Route path="/shoppinglist/:id" element={<ShoppingList />} />
      <Route path="/myshoplist" element={<MyShoppingList />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/delivery" element={<DeliveryPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};
const useLoginGuard = (component: ReactNode) => {
  const { user } = useContext(Context);
  if (user) {
    return component;
  } else {
    return <Navigate to="/login" />;
  }
};
