import { LOAD_STATUSES } from "../constatns";
import { CategoryListType } from "../../components/CategoryList/CategoryList";

export enum POP_GOODS_ACTIONS {
  SET_POP_GOODS = "popGoodsList/setPopGoods",
  SET_POP_GOODS_SUCCESS = "popGoodsList/setPopGoodsSuccess",
  SET_POP_GOODS_FAILURE = "popGoodsList/setPopGoodsFalure",
}

export interface PopGoodsType {
  popGoods: CategoryListType[];
  loadStatus: LOAD_STATUSES;
}
