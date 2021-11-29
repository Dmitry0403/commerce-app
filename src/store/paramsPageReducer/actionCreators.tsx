import { PARAMS_ACTION } from "./constans";
import type { ParamsType } from "./constans";

export const setCategoryParams = (payload: string) => ({
  type: PARAMS_ACTION.SET_CATEGORY_PARAMS,
  payload,
});

export const setGoodsParams = (params: ParamsType) => ({
  type: PARAMS_ACTION.SET_GOODS_PARAMS,
  params,
});
