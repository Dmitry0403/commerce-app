import { LOAD_STATUSES } from "../constatns";
import { CATEGORIES_ACTIONS, SideMenuType, CategoryType } from "./constatns";
import { Action } from "redux";

const INITIAL_STATE = { categories: [], loadStatus: LOAD_STATUSES.UNKNOWN };

export const categoriesReducer = (
  store: SideMenuType = INITIAL_STATE,
  action: Action<CATEGORIES_ACTIONS>
): SideMenuType => {
  switch (action.type) {
    case CATEGORIES_ACTIONS.SET_CATEGORIES:
      return {
        ...store,
        loadStatus: LOAD_STATUSES.LOADING,
      };
    case CATEGORIES_ACTIONS.SET_CATEGORIES_SUCCESS:
      const { payload } = action as {
        type: CATEGORIES_ACTIONS.SET_CATEGORIES_SUCCESS;
        payload: CategoryType[];
      };
      return {
        ...store,
        categories: payload,
        loadStatus: LOAD_STATUSES.SUCCESS,
      };
    case CATEGORIES_ACTIONS.SET_CATEGORIES_FAILURE:
      return {
        ...store,
        loadStatus: LOAD_STATUSES.FAILURE,
      };
    default:
      return store;
  }
};
