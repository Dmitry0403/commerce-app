export interface DataPagesType {
  type: string;
  goodsParams: GoodsParamsType,
  stateButton: boolean;
}

export interface GoodsParamsType {
  category_type: string;
  id: string;
}

export enum PARAMS_ACTION {
  GET_CATEGORY_PARAMS = "getCategoryParams",
  GET_GOODS_PARAMS = "getGoodsParams",
  GET_BUTTON_STATUS = "getButtonStatus"
}
