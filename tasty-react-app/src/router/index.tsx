import { Navigate, Route, Routes } from "react-router-dom";
import { CategoryPage } from "../pages/CategoryPage";
import { RecipePage } from "../pages/RecipePage";
import { SelectedCategory } from "../pages/SelectedCategory";
import { MainPage } from "../pages/MainPage";
import { LoginPage } from "../pages/Login";
import { RegistrationPage } from "../pages/RegistrationPage";
import { RegisterSuccess } from "../pages/RegisterSuccess";
import { Activation } from "../pages/Activation";
import { ReactNode, useContext } from "react";
import { Context } from "../App";
import { ResetPassword } from "../pages/ResetPassword";
import { ConfirmPassword } from "../pages/ConfirmPassword";
import { SavedRecipe } from "../components/SavedRecipe";
import { ShoppingList } from "../components/ShoppingList";
import { Error } from "../pages/Error";

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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/registersuccess" element={<RegisterSuccess />} />
      <Route path="/activate/:uid/:token" element={<Activation />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route
        path="/password/reset/confirm/:uid/:token"
        element={<ConfirmPassword />}
      />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};
const useLoginGuard = (component: ReactNode) => {
  const { user } = useContext(Context);
  console.log(user);
  if (user) {
    return component;
  } else {
    return <Navigate to="/login" />;
  }
};
