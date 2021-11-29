import { POP_GOODS_ACTIONS } from "./constatns";
import { CategoryListType } from "../../components/CategoryList";
import { Api } from "../../api";

export const getPopGoods = () => ({
  type: POP_GOODS_ACTIONS.SET_POP_GOODS,
});

export const getPopGoodsSuccess = (payload: CategoryListType[]) => ({
  type: POP_GOODS_ACTIONS.SET_POP_GOODS_SUCCESS,
  payload,
});

export const getPopGoodsFailure = () => ({
  type: POP_GOODS_ACTIONS.SET_POP_GOODS_FAILURE,
});

export const fetchPopGoods = () => async (dispatch: any) => {
  dispatch(getPopGoods());
  try {
    const payload = await Api.prototype.getPopularCategories();
    dispatch(getPopGoodsSuccess(payload));
  } catch (error) {
    dispatch(getPopGoodsFailure());
  }
};
