import { LOAD_STATUSES } from "../constatns";

export enum CATEGORIES_ACTIONS {
    SET_CATEGORIES = "categoryItems/setCategories",
    SET_CATEGORIES_SUCCESS = "categoryItems/setCategoriesSuccess",
    SET_CATEGORIES_FAILURE = "categoryItems/setCategoriesFalure"
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