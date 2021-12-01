import { LOAD_STATUSES } from "../constatns";
import { CategoryListType } from "../../components/CategoryList/CategoryList";

export enum POP_GOODS_ACTIONS {
  SET_POP_GOODS = "setPopGoods",
  SET_POP_GOODS_SUCCESS = "setPopGoodsSuccess",
  SET_POP_GOODS_FAILURE = "setPopGoodsFalure",
}

export interface PopGoodsType {
  popGoods: CategoryListType[];
  loadStatus: LOAD_STATUSES;
}
