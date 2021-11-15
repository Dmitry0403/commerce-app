import { POP_GOODS_ACTIONS } from "./constatns";
import { GoodsType } from "./constatns";

export const getPopGoods = () => ({
  type: POP_GOODS_ACTIONS.GET_POP_GOODS,
});

export const getPopGoodsSuccess = (payload: GoodsType[]) => ({
  type: POP_GOODS_ACTIONS.GET_POP_GOODS_SUCCESS,
  payload,
});

export const getPopGoodsFailure = () => ({
  type: POP_GOODS_ACTIONS.GET_POP_GOODS_FAILURE,
});

export const fetchPopGoods = () => async (dispatch: any) => {
  dispatch(getPopGoods());
  try {
    const resp = await fetch("./data/data-popular-categories.json");
    if (resp.ok) {
      const payload = await resp.json();
      dispatch(getPopGoodsSuccess(payload.popularCategory));
    } else throw new Error("error");
  } catch (error) {
    dispatch(getPopGoodsFailure());
  }
};
