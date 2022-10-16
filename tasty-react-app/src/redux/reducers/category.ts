import { IPost, IRecipe } from "./../../types/post";
import { AnyAction } from "redux";
import { ACTIONS } from "../constans";

export interface ICategoryState {
  allCategories: IPost[];
  isLoading: boolean;
  likedRecipe: IPost[];
  savedRecipe: IPost[];
  selectedCategory: IPost[];
}
export const defaultState: ICategoryState = {
  allCategories: [],
  isLoading: false,
  likedRecipe: [],
  savedRecipe: [],
  selectedCategory: [],
};

export const categoryReducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case ACTIONS.SET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: action.categories,
      };

    case ACTIONS.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };

    case ACTIONS.SET_SELECTED_CATEGORY:
      const newSelectedCategories = action.selectedCategory.map(
        (post: IPost) => {
          const likedRecipes = state.likedRecipe.find((item) => {
            if (item.id === post.id) {
              return item;
            }
            return null;
          });
          if (likedRecipes) {
            post.liked = true;
          }

          const savedRecipes = state.savedRecipe.find((item) => {
            if (item.id === post.id) {
              return item;
            }
            return null;
          });
          if (savedRecipes) {
            post.saved = true;
          }
          return post;
        }
      );

      return {
        ...state,
        selectedCategory: newSelectedCategories,
      };

    case ACTIONS.SET_LIKED_RECIPE:
      const recipeLike = action.recipe;

      const newLikedRecipe = recipeLike.liked
        ? state.likedRecipe.filter((item) => {
            if (item.id === recipeLike.id) {
              return false;
            } else {
              return true;
            }
          })
        : state.likedRecipe.concat([{ ...recipeLike, liked: true }]);

      const newAllRecipeLike = state.selectedCategory.map((recipe) => {
        if (recipe.id === action.recipe.id) {
          recipe.liked = !recipe.liked;
        }
        return recipe;
      });
      return {
        ...state,
        likedRecipe: newLikedRecipe,
        selectedCategory: newAllRecipeLike,
      };

    case ACTIONS.SET_SAVE_RECIPE:
      const recipeSave = action.recipe;

      const newSaveRecipe = recipeSave.saved
        ? state.savedRecipe.filter((item) => {
            if (item.id === recipeSave.id) {
              return false;
            } else {
              return true;
            }
          })
        : state.savedRecipe.concat([{ ...recipeSave, saved: true }]);

      const newAllRecipeSave = state.selectedCategory.map((recipe) => {
        if (recipe.id === action.recipe.id) {
          recipe.saved = !recipe.saved;
        }
        return recipe;
      });
      return {
        ...state,
        savedRecipe: newSaveRecipe,
        selectedCategory: newAllRecipeSave,
      };

    default:
      return state;
  }
};
