import { Dispatch } from "redux";
import { fetchAllCategory, fetchIngredientsFromShop } from "../../api/recipe";
import { IPost, IRecipe, IShop } from "../../types/post";
import { ACTIONS } from "../constans";
import { TState } from "../store";

export const setAllCategories = (categories: IPost[]) => {
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

export const setShowLoadMore = (showLoadMore: boolean) => {
  return {
    type: ACTIONS.SET_SHOW_LOAD_MORE,
    showLoadMore,
  };
};

export const loadAppCategories = () => {
  return (dispatch: Dispatch, getState: () => TState) => {
    const { categoryReducer } = getState();
    const allCategories = categoryReducer.allCategories;
    dispatch(setIsLoading(true));
    fetchAllCategory(allCategories.length)
      .then((values) => {
        if (values.count > values.items.length) {
          dispatch(setShowLoadMore(true));
        } else {
          dispatch(setShowLoadMore(false));
        }
        if (allCategories.length !== 0) {
          dispatch(
            setAllCategories(
              allCategories.concat(
                values.items.splice(allCategories.length, allCategories.length)
              )
            )
          );
        } else {
          dispatch(setAllCategories(values.items));
        }
        dispatch(setAllCategories(values.items.splice(0, 3)));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};

export const loadMorePosts = () => {
  return (dispatch: Dispatch, getState: () => TState) => {
    const allCategories = getState().categoryReducer.allCategories;
    const promise = fetchAllCategory(allCategories.length);
    promise.then((values) => {
      if (values.items.length + allCategories.length === values.count) {
        dispatch(setShowLoadMore(false));
      } else {
        dispatch(setShowLoadMore(true));
      }
      dispatch(
        setAllCategories(
          allCategories.concat(values.items.splice(allCategories.length, 3))
        )
      );
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
