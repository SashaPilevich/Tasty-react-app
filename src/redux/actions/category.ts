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
export const setSelectedCategory = (recipiesOfSelectedCategory: IPost[]) => {
  return {
    type: ACTIONS.SET_SELECTED_CATEGORY,
    recipiesOfSelectedCategory,
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
export const setShopItems = (productsFromShop: IShop[]) => {
  return { type: ACTIONS.SET_SHOP_ITEMS, productsFromShop };
};

export const setLocalItems = (productsFromLocal: string[]) => {
  return { type: ACTIONS.SET_LOCAL_ITEMS, productsFromLocal };
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
export const setRecipe = (recipe: IRecipe[]) => {
  return {
    type: ACTIONS.SET_RECIPE,
    recipe,
  };
};
export const setTotalPrice = (totalPrice: number) => {
  return {
    type: ACTIONS.SET_TOTAL_PRICE,
    totalPrice,
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
          "items",
          JSON.stringify(
            values[page].concat(values[page + 1], values[page + 2])
          )
        );
        dispatch(setAllCategories(values[page]));
        dispatch(setPage(page + 1));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};

export const loadMorePosts = () => {
  return (dispatch: Dispatch, getState: () => TState) => {
    const allCategories = getState().categoryReducer.allCategories;
    const page = getState().categoryReducer.page;
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
      const shopItems = myShopList.map((ingredient: string) => {
        const findShopItem = values.find((item: IShop) => {
          if (item.title === ingredient) {
            return item;
          }
          return null;
        });

        return findShopItem;
      });
      const fullPrice = values.reduce((sum: number, item: IShop) => {
        return sum + item.price * item.count;
      }, 0);

      dispatch(setShopItems(shopItems));
      dispatch(setTotalPrice(fullPrice.toFixed(2)));
    });
  };
};
