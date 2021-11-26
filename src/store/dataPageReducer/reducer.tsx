import type { GoodsParamsType, DataPagesType } from "./constans";
import { PARAMS_ACTION } from "./constans";
import { Action } from "redux";

const INITIAL_STATE = {
  type: "",
  goodsParams: {
    category_type: "",
    id: "",
  },
  stateButton: "Положить в корзину",
};

export const dataPageReducer = (
  store: DataPagesType = INITIAL_STATE,
  action: Action<PARAMS_ACTION>
): DataPagesType => {
  switch (action.type) {
    case PARAMS_ACTION.SET_CATEGORY_PARAMS:
      const { payload } = action as {
        type: PARAMS_ACTION.SET_CATEGORY_PARAMS;
        payload: string;
      };
      return {
        ...store,
        type: payload,
      };
    case PARAMS_ACTION.SET_GOODS_PARAMS:
      const { params } = action as {
        type: PARAMS_ACTION.SET_GOODS_PARAMS;
        params: GoodsParamsType;
      };
      return {
        ...store,
        goodsParams: {
          category_type: params.category_type,
          id: params.id,
        },
      };
    case PARAMS_ACTION.SET_BUTTON_STATUS:
      const  {stateButton} = action as {
        type: PARAMS_ACTION.SET_BUTTON_STATUS;
        stateButton: string;
      };
      return {
        ...store,
        stateButton
      };

    default:
      return store;
  }
};
