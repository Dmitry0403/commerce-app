import { GOODS_ACTIONS } from "./constatns";
import { GoodsType } from "./constatns";
import { Api } from "../../api";
import { setCategoriesSuccess } from "../categoriesReducer/actionCreators";

export const setGoods = () => ({
  type: GOODS_ACTIONS.SET_GOODS,
});

export const setGoodsSuccess = (payload: GoodsType[]) => ({
  type: GOODS_ACTIONS.SET_GOODS_SUCCESS,
  payload,
});

export const setGoodsFailure = () => ({
  type: GOODS_ACTIONS.SET_GOODS_FAILURE,
});

export const fetchGoods = (params: string) => async (dispatch: any) => {
  dispatch(setGoods());
  try {
    const payload = await Api.prototype.getGoods(params);
    dispatch(setGoodsSuccess(payload));
  } catch (error) {
    dispatch(setGoodsFailure());
  }
};

export const fetchCategoryGoods =
  (paramsCategory: string, paramsGoods: string) => async (dispatch: any) => {
    dispatch(setGoods());
    try {
      Promise.all([
        Api.prototype.getCategories(paramsCategory),
        Api.prototype.getGoods(paramsGoods),
      ]).then((resp) => {
        dispatch(setCategoriesSuccess(resp[0].categories));
        dispatch(setGoodsSuccess(resp[1]));
      });
    } catch (error) {
      dispatch(setGoodsFailure());
    }
  };
