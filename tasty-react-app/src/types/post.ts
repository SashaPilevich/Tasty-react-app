export interface IPost {
  id: number;
  name: string;
  title: string;
  time?: string;
  kcal?: string;
}
export interface IRecipe {
  id: number;
  name?: string;
  title: string;
  ingredients?: string[];
  video?: string;
  instructions?: string[];
  quantity?: string[];
}
