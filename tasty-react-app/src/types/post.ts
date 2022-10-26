export interface IPost {
  id: string | undefined;
  name: string;
  title: string;
  time?: string;
  kcal?: string;
  liked?: boolean;
  saved?: boolean;
}
export interface IRecipe {
  id: string | undefined;
  name?: string;
  title?: string;
  ingredients?: string[];
  video?: string;
  instructions?: string[];
  quantity?: string[];
  delete?: boolean;
}
export interface IShop {
  title: string;
  price: number;
  quantity: string;
  image: string;
}
