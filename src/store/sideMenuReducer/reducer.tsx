import { LOAD_STATUSES, TYPE_ACTIONS } from "../constatns";
import { Action } from "redux";

export interface ItemMenuType {
  label: string;
}

export interface SideMenuType {
  titles: ItemMenuType[];
  loadStatus: LOAD_STATUSES;
}

const INITIAL_STATE = { titles: [], loadStatus: LOAD_STATUSES.UNKNOWN };

export const sideMenuReducer = (
  store: SideMenuType = INITIAL_STATE,
  action: Action<TYPE_ACTIONS>
): SideMenuType => {
  switch (action.type) {
    case TYPE_ACTIONS.GET_MENU_ITEMS:
      return {
        ...store,
        loadStatus: LOAD_STATUSES.LOADING,
      };
    case TYPE_ACTIONS.GET_MENU_ITEMS_SUCCESS:
      const { payload } = action as {
        type: TYPE_ACTIONS.GET_MENU_ITEMS_SUCCESS;
        payload: ItemMenuType[];
      };
      return { ...store, titles: payload, loadStatus: LOAD_STATUSES.SUCCESS };
    case TYPE_ACTIONS.GET_MENU_ITEMS_FAILURE:
      return {
        ...store,
        loadStatus: LOAD_STATUSES.FAILURE,
      };
    default:
      return store;
  }
};
