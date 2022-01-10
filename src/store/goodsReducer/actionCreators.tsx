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

export const setGoodsSuccessSearchHeader = (payloadHeader: GoodsType[]) => ({
  type: GOODS_ACTIONS.SET_GOODS_SUCCESS_SEARCHHEADER,
  payloadHeader,
});

export const setGoodsFailure = () => ({
  type: GOODS_ACTIONS.SET_GOODS_FAILURE,
});

export const fetchGoods =
  (params: string) => async (dispatch: any, _getState: unknown, api: Api) => {
    dispatch(setGoods());
    try {
      const payload = await api.getGoods(params);
      dispatch(setGoodsSuccess(payload));
    } catch (error) {
      dispatch(setGoodsFailure());
    }
  };

export const fetchGoodsSearchHeader =
  (params: string) => async (dispatch: any, getState: unknown, api: Api) => {
    try {
      const payload = await api.getGoods(params);
      dispatch(setGoodsSuccessSearchHeader(payload));
    } catch (error) {
      dispatch(setGoodsFailure());
    }
  };

export const fetchCategoryGoods =
  (paramsCategory: string, paramsGoods: string) =>
  async (dispatch: any, _getState: unknown, api: Api) => {
    dispatch(setGoods());
    try {
      Promise.all([
        api.getCategories(paramsCategory),
        api.getGoods(paramsGoods),
      ]).then((resp) => {
        dispatch(setCategoriesSuccess(resp[0].categories));
        dispatch(setGoodsSuccess(resp[1]));
      });
    } catch (error) {
      dispatch(setGoodsFailure());
    }
  };
