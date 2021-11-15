import { LOAD_STATUSES } from "../constatns";

export enum CATEGORIES_ACTIONS {
    GET_CATEGORIES = "getCategories",
    GET_CATEGORIES_SUCCESS = "getCategoriesSuccess",
    GET_CATEGORIES_FAILURE = "getCategoriesFalure"
}

export interface CategoryType {
    id: number;
    label: string;
    type: string;
  }
  
  export interface SideMenuType {
    categories: CategoryType[];
    loadStatus: LOAD_STATUSES;
  }