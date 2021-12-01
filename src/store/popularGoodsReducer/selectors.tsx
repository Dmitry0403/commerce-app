import { RootState } from "../store";
import { CategoryListType } from "../../components/CategoryList/CategoryList";


export const getPopGoods = (state: RootState): CategoryListType[] =>
  state.popGoodsList.popGoods;

export const getPopGoodsLoadStatus = (state: RootState) => state.popGoodsList.loadStatus
