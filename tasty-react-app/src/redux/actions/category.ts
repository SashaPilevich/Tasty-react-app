import { Dispatch } from "redux";
import { fetchAllCategory, fetchIngredientsFromShop } from "../../api/recipe";
import { IPost, IRecipe, IShop } from "../../types/post";
import { ACTIONS } from "../constans";
import { TState } from "../store";

export const setAllCategories = (categories: IPost) => {
  return {
    type: ACTIONS.SET_ALL_CATEGORIES,
    categories,
  };
};
export const setSelectedCategory = (selectedCategory: IPost) => {
  return {
    type: ACTIONS.SET_SELECTED_CATEGORY,
    selectedCategory,
  };
};
export const setIsLoading = (isLoading: boolean) => {
  return {
    type: ACTIONS.SET_IS_LOADING,
    isLoading,
  };
};
export const likeRecipes = (recipes: IPost) => {
  return { type: ACTIONS.SET_LIKED_RECIPE, recipes };
};

export const saveRecipes = (recipes: IPost) => {
  return { type: ACTIONS.SET_SAVE_RECIPE, recipes };
};
export const setShopItem = (product: IShop) => {
  return { type: ACTIONS.SET_SHOP_ITEM, product };
};

export const setLocalItem = (products: string[]) => {
  return { type: ACTIONS.SET_LOCAL_ITEM, products };
};

export const loadAppCategories = () => {
  return (dispatch: Dispatch, getState: () => TState) => {
    dispatch(setIsLoading(true));
    fetchAllCategory()
      .then((values) => {
        dispatch(setAllCategories(values));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};
export const loadShop = () => {
  return (dispatch: Dispatch, getState: () => TState) => {
    fetchIngredientsFromShop().then((values) => {
      dispatch(setShopItem(values));
    });
  };
};
