import { LOAD_STATUSES } from "../constatns";
import { CategoryListType } from "../../CategoryList/CategoryList";

export enum POP_GOODS_ACTIONS {
    GET_POP_GOODS = "getPopGoods",
    GET_POP_GOODS_SUCCESS = "getPopGoodsSuccess",
    GET_POP_GOODS_FAILURE = "getPopGoodsFalure"
}

export interface GoodsType {
    id?: number;
    category_type?: string;
    label: string;
    price: number;
    img: string;
  }

  export interface PopGoodsType {
    popGoods: CategoryListType[];
    loadStatus: LOAD_STATUSES;
  }

  