import type { ParamsType } from "./constans";
import { PARAMS_ACTION } from "./constans";
import { Action } from "redux";

const INITIAL_STATE: ParamsType = {
  type: "",
  id: "",
};

export const paramsPageReducer = (
  store: ParamsType = INITIAL_STATE,
  action: Action<PARAMS_ACTION>
): ParamsType => {
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
        params: ParamsType;
      };
      return {
        ...store,
        type: params.type,
        id: params.id,
      };
    default:
      return store;
  }
};
