import { LOAD_STATUSES } from "../constatns";

export enum GOODS_ACTIONS {
  SET_GOODS = "goodsData/setGoods",
  SET_GOODS_SUCCESS = "goodsData/setGoodsSuccess",
  SET_GOODS_SUCCESS_SEARCHHEADER = "goodsData/setGoodsSuccessSearchHeader",
  SET_GOODS_FAILURE = "goodsData/setGoodsFalure",
}

export interface GoodsCardType {
  id: string;
  categoryTypeId: string;
  label: string;
  price: string;
  img: string;
  description?: string;
  type?: string;
}

export interface GoodsType {
  itemsSearchHeader: GoodsCardType[];
  items: GoodsCardType[];
  total: number;
}

export interface GoodsTypeStore extends GoodsType {
  loadStatus: LOAD_STATUSES;
}
