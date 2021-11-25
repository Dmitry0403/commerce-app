export interface DataPagesType {
  type: string;
  goodsParams: GoodsParamsType,
  stateButton: string;
}

export interface GoodsParamsType {
  category_type: string;
  id: string;
}

export interface CartType {
  type: string;
  id: number;
}

export enum PARAMS_ACTION {
  GET_CATEGORY_PARAMS = "getCategoryParams",
  GET_GOODS_PARAMS = "getGoodsParams",
  GET_BUTTON_STATUS = "getButtonStatus"
}
