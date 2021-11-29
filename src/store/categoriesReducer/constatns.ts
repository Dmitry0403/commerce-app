import { LOAD_STATUSES } from "../constatns";

export enum CATEGORIES_ACTIONS {
    SET_CATEGORIES = "setCategories",
    SET_CATEGORIES_SUCCESS = "setCategoriesSuccess",
    SET_CATEGORIES_FAILURE = "setCategoriesFalure"
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