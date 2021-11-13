import { TYPE_ACTIONS } from "../constatns";
import { ItemMenuType } from "./reducer";

export const getMenuItems = () => ({
  type: TYPE_ACTIONS.GET_MENU_ITEMS,
});

export const getMenuItemsSuccess = (payload: ItemMenuType[]) => ({
  type: TYPE_ACTIONS.GET_MENU_ITEMS_SUCCESS,
  payload,
});

export const getMenuItemsFailure = () => ({
  type: TYPE_ACTIONS.GET_MENU_ITEMS_FAILURE,
});

export const fetchSideMenuItems = () => async (dispatch: any) => {
  dispatch(getMenuItems());
  try {
    const resp = await fetch("./json/side-menu-items.json");
    if (resp.ok) {
      const payload = await resp.json();
      dispatch(getMenuItemsSuccess(payload));
    } else throw new Error("error");
  } catch (error) {
    dispatch(getMenuItemsFailure());
  }
};
