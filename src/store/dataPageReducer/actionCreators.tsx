import { PARAMS_ACTION } from "./constans";
import type { GoodsParamsType } from "./constans";

export const getCategoryParams = (payload:string) => ({
  type: PARAMS_ACTION.GET_CATEGORY_PARAMS,
  payload,
});

export const getGoodsParams = (params:GoodsParamsType) => ({
  type: PARAMS_ACTION.GET_GOODS_PARAMS,
  params,
});

export const getButtonStatus = (payload:boolean) => ({
  type: PARAMS_ACTION.GET_BUTTON_STATUS,
  payload
})