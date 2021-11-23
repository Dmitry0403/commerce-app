import { LOAD_STATUSES } from "../constatns";
import { Action } from "redux";
import { PopGoodsType, POP_GOODS_ACTIONS } from "./constatns";
import { CategoryListType } from "../../components/CategoryList/CategoryList";

const INITIAL_STATE = { popGoods: [], loadStatus: LOAD_STATUSES.UNKNOWN };

export const popGoodsReducer = (
  store: PopGoodsType = INITIAL_STATE,
  action: Action<POP_GOODS_ACTIONS>
): PopGoodsType => {
  switch (action.type) {
    case POP_GOODS_ACTIONS.GET_POP_GOODS:
      return {
        ...store,
        loadStatus: LOAD_STATUSES.LOADING,
      };
    case POP_GOODS_ACTIONS.GET_POP_GOODS_SUCCESS:
      const { payload } = action as {
        type: POP_GOODS_ACTIONS.GET_POP_GOODS_SUCCESS;
        payload: CategoryListType[];
      };
      return {
        ...store,
        popGoods: payload,
        loadStatus: LOAD_STATUSES.SUCCESS,
      };
    case POP_GOODS_ACTIONS.GET_POP_GOODS_FAILURE:
      return {
        ...store,
        loadStatus: LOAD_STATUSES.FAILURE,
      };
    default:
      return store;
  }
};
