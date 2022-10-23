import { Dispatch } from "redux";
import { fetchAllCategory } from "../../api/recipe";
import { IPost, IRecipe } from "../../types/post";
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
export const likeRecipe = (recipe: IPost) => {
  return { type: ACTIONS.SET_LIKED_RECIPE, recipe };
};

export const saveRecipe = (recipe: IPost) => {
  return { type: ACTIONS.SET_SAVE_RECIPE, recipe };
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
