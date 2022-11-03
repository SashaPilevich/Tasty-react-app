export const fetchAllCategory = (page?: number) => {
  return fetch(
    `https://62b0c0c4e460b79df04c901b.mockapi.io/api/selected?page=${page}&limit=3`
  ).then((response) => {
    return response.json();
  });
};

export const fetchSelectedCategory = (id: string | undefined) => {
  return fetch(
    `https://62b0c0c4e460b79df04c901b.mockapi.io/api/selected/${id}`
  ).then((response) => {
    return response.json();
  });
};

export const fetchSelectedRecipe = (id: string | undefined) => {
  return fetch(
    `https://62b0c0c4e460b79df04c901b.mockapi.io/api/selected/${id}/category`
  ).then((response) => {
    return response.json();
  });
};
export const fetchIngredientsFromShop = () => {
  return fetch("https://62b0c0c4e460b79df04c901b.mockapi.io/api/shop").then(
    (response) => {
      return response.json();
    }
  );
};
