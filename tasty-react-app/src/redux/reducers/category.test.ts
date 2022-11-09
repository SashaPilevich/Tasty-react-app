import { ACTIONS } from "../constans";
import { categoryReducer, defaultState } from "./category";

describe("Category Reducer:", () => {
  test("ACTIONS.SET_ALL_CATEGORIES:при передаче объекта возвращает его ", () => {
    expect(
      categoryReducer(defaultState, {
        type: ACTIONS.SET_ALL_CATEGORIES,
        categories: [
          {
            id: "1",
            name: "https://i.ibb.co/qgNBbvk/breakfast.jpg",
            title: "Breakfast",
          },
        ],
      })
    ).toEqual({
      ...defaultState,
      allCategories: [
        {
          id: "1",
          name: "https://i.ibb.co/qgNBbvk/breakfast.jpg",
          title: "Breakfast",
        },
      ],
    });
  });
  test("ACTIONS.SET_ALL_CATEGORIES:если объект не передан то возвращает значение по умолчанию ", () => {
    expect(
      categoryReducer(defaultState, {
        type: ACTIONS.SET_ALL_CATEGORIES,
      })
    ).toEqual({
      ...defaultState,
      allCategories: undefined,
    });
  });
  test("ACTIONS.SET_IS_LOADING: если значение true то вернет true", () => {
    expect(
      categoryReducer(defaultState, {
        type: ACTIONS.SET_IS_LOADING,
        isLoading: true,
      })
    ).toEqual({ ...defaultState, isLoading: true });
  });
  test("ACTIONS.SET_IS_LOADING: если значение не передано,то вернет undefined", () => {
    expect(
      categoryReducer(defaultState, {
        type: ACTIONS.SET_IS_LOADING,
      })
    ).toEqual({ ...defaultState, isLoading: undefined });
  });
  test("ACTIONS.SET_SHOW_LOAD_MORE: если значение true то вернет true", () => {
    expect(
      categoryReducer(defaultState, {
        type: ACTIONS.SET_SHOW_LOAD_MORE,
        showLoadMore: true,
      })
    ).toEqual({ ...defaultState, showLoadMore: true });
  });
  test("ACTIONS.SET_SHOW_LOAD_MORE: если значение не передано,то вернет undefined", () => {
    expect(
      categoryReducer(defaultState, {
        type: ACTIONS.SET_SHOW_LOAD_MORE,
      })
    ).toEqual({ ...defaultState, showLoadMore: undefined });
  });
  test("ACTIONS.SET_PAGE: вернет переданное значение", () => {
    expect(
      categoryReducer(defaultState, {
        type: ACTIONS.SET_PAGE,
        page: 2,
      })
    ).toEqual({ ...defaultState, page: 2 });
  });
  test("ACTIONS.SET_PAGE: если значение не передано,то вернет undefined", () => {
    expect(
      categoryReducer(defaultState, {
        type: ACTIONS.SET_PAGE,
      })
    ).toEqual({ ...defaultState, page: undefined });
  });
  test("ACTIONS.SET_SELECTED_CATEGORY:при передаче объекта возвращает его ", () => {
    expect(
      categoryReducer(defaultState, {
        type: ACTIONS.SET_SELECTED_CATEGORY,
        recipiesOfSelectedCategory: [
          {
            id: 1,
            name: "https://i.ibb.co/GMwZdBW/pancakes.jpg",
            title: "Блинчики с кленовым сиропом",
            time: "40 минут",
            kcal: "733 ккал",
          },
          {
            id: 2,
            name: "https://i.ibb.co/NWQhmDV/AVOCADO-TOAST-WITH-A-POACHED-EGG.png",
            title: "Тост с яйцом пашот и авокадо",
            time: "10 минут",
            kcal: "628 ккал",
          },
        ],
      })
    ).toEqual({
      ...defaultState,
      recipiesOfSelectedCategory: [
        {
          id: 1,
          name: "https://i.ibb.co/GMwZdBW/pancakes.jpg",
          title: "Блинчики с кленовым сиропом",
          time: "40 минут",
          kcal: "733 ккал",
        },
        {
          id: 2,
          name: "https://i.ibb.co/NWQhmDV/AVOCADO-TOAST-WITH-A-POACHED-EGG.png",
          title: "Тост с яйцом пашот и авокадо",
          time: "10 минут",
          kcal: "628 ккал",
        },
      ],
    });
  });
  test("ACTIONS.SET_SELECTED_CATEGORY:если объект не передан то возвращает значение по умолчанию ", () => {
    expect(
      categoryReducer(defaultState, {
        type: ACTIONS.SET_SELECTED_CATEGORY,
      })
    ).toEqual({
      ...defaultState,
      recipiesOfSelectedCategory: undefined,
    });
  });
  test("ACTIONS.SET_LOCAL_ITEMS:при передаче объекта возвращает его", () => {
    expect(
      categoryReducer(defaultState, {
        type: ACTIONS.SET_LOCAL_ITEMS,
        productsFromLocal: ["Молоко", "Авокадо"],
      })
    ).toEqual({ ...defaultState, localItems: ["Молоко", "Авокадо"] });
  });
  test("ACTIONS.SET_LOCAL_ITEMS:если объект не передан то возвращает значение по умолчанию", () => {
    expect(
      categoryReducer(defaultState, {
        type: ACTIONS.SET_LOCAL_ITEMS,
      })
    ).toEqual({ ...defaultState, localItems: undefined });
  });
  test("ACTIONS.SET_SHOP_ITEMS:при передаче объекта возвращает его", () => {
    expect(
      categoryReducer(defaultState, {
        type: ACTIONS.SET_SHOP_ITEMS,
        productsFromShop: [
          {
            title: "Молоко",
            image: "https://i.ibb.co/4SvFZN6/image.png",
            price: 1.75,
            quantity: "1 л",
          },
        ],
      })
    ).toEqual({
      ...defaultState,
      shopItems: [
        {
          title: "Молоко",
          image: "https://i.ibb.co/4SvFZN6/image.png",
          price: 1.75,
          quantity: "1 л",
        },
      ],
    });
  });
  test("ACTIONS.SET_SHOP_ITEMS:если объект не передан то возвращает значение по умолчанию", () => {
    expect(
      categoryReducer(defaultState, {
        type: ACTIONS.SET_SHOP_ITEMS,
      })
    ).toEqual({
      ...defaultState,
      shopItems: undefined,
    });
  });
  test("ACTIONS.SET_LIKED_RECIPE:при нажатии на like возвращает like true", () => {
    expect(
      categoryReducer(defaultState, {
        type: ACTIONS.SET_LIKED_RECIPE,
        recipes: {
          isSelected: true,
          isCategory: true,
          id: 1,
          name: "https://i.ibb.co/GMwZdBW/pancakes.jpg",
          title: "Блинчики с кленовым сиропом",
          time: "40 минут",
          kcal: "733 ккал",
          liked: false,
        },
      })
    ).toEqual({
      ...defaultState,
      likedRecipes: [
        {
          isSelected: true,
          isCategory: true,
          id: 1,
          name: "https://i.ibb.co/GMwZdBW/pancakes.jpg",
          title: "Блинчики с кленовым сиропом",
          time: "40 минут",
          kcal: "733 ккал",
          liked: true,
        },
      ],
    });
  });
  test("ACTIONS.SET_SAVE_RECIPE:при нажатии на save,на рецепт который уже сохранен возвращает false", () => {
    expect(
      categoryReducer(defaultState, {
        type: ACTIONS.SET_SAVE_RECIPE,
        recipes: {
          isSelected: true,
          isCategory: true,
          id: 1,
          name: "https://i.ibb.co/GMwZdBW/pancakes.jpg",
          title: "Блинчики с кленовым сиропом",
          time: "40 минут",
          kcal: "733 ккал",
          saved: true,
        },
      })
    ).toEqual({
      ...defaultState,
      savedRecipes: [],
    });
  });
});
export {};
