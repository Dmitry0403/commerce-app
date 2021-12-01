import { RootState } from "../store";
import { GoodsCardType } from "./constatns";

export const getGoods = (state: RootState): GoodsCardType[] =>
  state.goodsData.items;

export const getGoodsLoadStatus = (state: RootState) =>
  state.goodsData.loadStatus;
