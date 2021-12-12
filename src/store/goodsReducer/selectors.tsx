import { RootState } from "../store";
import type { GoodsTypeStore } from "./constatns";

export const getGoodsSlice = (state: RootState): GoodsTypeStore =>
  state.goodsData;
