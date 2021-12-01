import { LOAD_STATUSES } from "../constatns";
import { Action } from "redux";
import { GOODS_ACTIONS } from "./constatns";
import type { GoodsType, GoodsTypeStore } from "./constatns";

const INITIAL_STATE: GoodsTypeStore = {
  items: [],
  total: 0,
  loadStatus: LOAD_STATUSES.UNKNOWN,
};

export const goodsReducer = (
  store: GoodsTypeStore = INITIAL_STATE,
  action: Action<GOODS_ACTIONS>
): GoodsTypeStore => {
  switch (action.type) {
    case GOODS_ACTIONS.SET_GOODS:
      return {
        ...store,
        loadStatus: LOAD_STATUSES.LOADING,
      };
    case GOODS_ACTIONS.SET_GOODS_SUCCESS:
      const { payload } = action as {
        type: GOODS_ACTIONS.SET_GOODS_SUCCESS;
        payload: GoodsType;
      };
      return {
        ...store,
        items: payload.items,
        total: payload.total,
        loadStatus: LOAD_STATUSES.SUCCESS,
      };
    case GOODS_ACTIONS.SET_GOODS_FAILURE:
      return {
        ...store,
        loadStatus: LOAD_STATUSES.FAILURE,
      };
    default:
      return store;
  }
};
