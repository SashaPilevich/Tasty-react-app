import { IPost, IRecipe, IShop } from "./../../types/post";
import { AnyAction } from "redux";
import { ACTIONS } from "../constans";

export interface ICategoryState {
  allCategories: IPost[];
  isLoading: boolean;
  likedRecipes: IPost[];
  savedRecipes: IPost[];
  recipiesOfSelectedCategory: IPost[];
  shopItems: IShop[];
  localItems: string[];
  showLoadMore: boolean;
  page: number;
  recipe: IRecipe[];
  totalPrice: number;
}
export const defaultState: ICategoryState = {
  allCategories: [],
  isLoading: false,
  likedRecipes: [],
  savedRecipes: [],
  recipiesOfSelectedCategory: [],
  shopItems: [],
  localItems: [],
  showLoadMore: true,
  page: 1,
  recipe: [],
  totalPrice: 0,
};

export const categoryReducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case ACTIONS.SET_TOTAL_PRICE:
      const fullPrice = state.shopItems.reduce((sum: number, item: IShop) => {
        return sum + item.price * item.count;
      }, 0);

      return {
        ...state,
        totalPrice: fullPrice.toFixed(2),
      };
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
    case ACTIONS.SET_SHOW_LOAD_MORE:
      return {
        ...state,
        showLoadMore: action.showLoadMore,
      };
    case ACTIONS.SET_LOCAL_ITEMS:
      return {
        ...state,
        localItems: action.productsFromLocal,
      };
    case ACTIONS.SET_PAGE:
      return {
        ...state,
        page: action.page,
      };

    case ACTIONS.SET_SHOP_ITEMS:
      return {
        ...state,
        shopItems: action.productsFromShop,
      };

    case ACTIONS.SET_SELECTED_CATEGORY:
      const newSelectedCategories = action.recipiesOfSelectedCategory?.map(
        (post: IPost) => {
          const likedRecipes = state.likedRecipes.find((item) => {
            if (item.id === post.id) {
              return item;
            }
            return null;
          });
          if (likedRecipes) {
            post.liked = true;
          }

          const savedRecipes = state.savedRecipes.find((item) => {
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
        recipiesOfSelectedCategory: newSelectedCategories,
      };

    case ACTIONS.SET_LIKED_RECIPE:
      const recipeLike = action.recipes;

      const newLikedRecipe = recipeLike.liked
        ? state.likedRecipes.filter((item) => {
            if (item.id === recipeLike.id) {
              return false;
            } else {
              return true;
            }
          })
        : state.likedRecipes.concat([{ ...recipeLike, liked: true }]);

      const newAllRecipeLike = state.recipiesOfSelectedCategory.map(
        (recipe) => {
          if (recipe.id === action.recipes.id) {
            recipe.liked = !recipe.liked;
          }
          return recipe;
        }
      );
      return {
        ...state,
        likedRecipes: newLikedRecipe,
        recipiesOfSelectedCategory: newAllRecipeLike,
      };

    case ACTIONS.SET_SAVE_RECIPE:
      const recipeSave = action.recipes;

      const newSaveRecipe = recipeSave.saved
        ? state.savedRecipes.filter((item) => {
            if (item.id === recipeSave.id) {
              return false;
            } else {
              return true;
            }
          })
        : state.savedRecipes.concat([{ ...recipeSave, saved: true }]);

      const newAllRecipeSave = state.recipiesOfSelectedCategory.map(
        (recipe) => {
          if (recipe.id === action.recipes.id) {
            recipe.saved = !recipe.saved;
          }
          return recipe;
        }
      );
      return {
        ...state,
        savedRecipes: newSaveRecipe,
        recipiesOfSelectedCategory: newAllRecipeSave,
      };
    case ACTIONS.SET_RECIPE:
      return {
        ...state,
        recipe: action.recipe,
      };

    default:
      return state;
  }
};
