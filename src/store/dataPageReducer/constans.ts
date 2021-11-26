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
  SET_CATEGORY_PARAMS = "setCategoryParams",
  SET_GOODS_PARAMS = "setGoodsParams",
  SET_BUTTON_STATUS = "setButtonStatus"
}
