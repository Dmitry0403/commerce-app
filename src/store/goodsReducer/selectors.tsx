import { RootState } from "../store";
import { GoodsCardType } from "./constatns";

export const getGoods = (state: RootState): GoodsCardType[] =>
  state.goodsData.items;

export const getTotalGoods = (state: RootState): number =>
  state.goodsData.total;

export const getGoodsLoadStatus = (state: RootState) =>
  state.goodsData.loadStatus;

export const getGoodsSearchHeader = (state: RootState): GoodsCardType[] =>
  state.goodsData.itemsSearchHeader;
