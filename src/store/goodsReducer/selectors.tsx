import { RootState } from "../store";
import type { GoodsCardType } from "./constatns";

  export const getGoodsItems = (state: RootState ):GoodsCardType[] =>
  state.goodsData.items
  
  export const getGoodsLoadStatus = (state: RootState ):string =>
  state.goodsData.loadStatus 
  
  export const getItemsSearchHeader = (state: RootState):GoodsCardType[] =>
  state.goodsData.itemsSearchHeader
  
  export const getTotalGoodsItems =  (state: RootState):number =>
  state.goodsData.total
  