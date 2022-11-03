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
export const setSelectedCategory = (selectedCategory: IPost[]) => {
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
export const setShopItem = (product: IShop[]) => {
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
export const setPage = (page: number) => {
  return {
    type: ACTIONS.SET_PAGE,
    page,
  };
};

export const loadAppCategories = (page: number) => {
  return (dispatch: Dispatch, getState: () => TState) => {
    dispatch(setIsLoading(true));
    fetchAllCategory()
      .then((values) => {
        if (values.count > values[page].length) {
          dispatch(setShowLoadMore(true));
        } else {
          dispatch(setShowLoadMore(false));
        }
        localStorage.setItem(
          "item",
          JSON.stringify(
            values[page].concat(values[page + 1], values[page + 2])
          )
        );
        dispatch(setAllCategories(values[page]));
        dispatch(setPage(page + 1)); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};

export const loadMorePosts = () => {
  return (dispatch: Dispatch, getState: () => TState) => {
    const allCategories = getState().categoryReducer.allCategories;
    const page = getState().categoryReducer.setPage;
    const promise = fetchAllCategory(page);
    promise.then((values) => {
      dispatch(setAllCategories(allCategories.concat(values[page])));
      if (values[page].length + allCategories.length === values.count) {
        dispatch(setShowLoadMore(false));
        dispatch(setPage(1));
      }
      dispatch(setPage(page + 1));
    });
  };
};
export const loadShop = () => {
  return (dispatch: Dispatch, getState: () => TState) => {
    fetchIngredientsFromShop().then((values) => {
      let myShopList: string[] = [];
      let shopList = localStorage.getItem("shopList");
      if (shopList) {
        myShopList = JSON.parse(shopList);
      }
      const newShopItem = myShopList.map((ingredient: string) => {
        const findShopItem = values.find((item: IShop) => {
          if (item.title === ingredient) {
            return item;
          }
          return null;
        });

        return findShopItem;
      });

      dispatch(setShopItem(newShopItem));
    });
  };
};
