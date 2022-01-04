import { GoodsCardType } from "../../store/goodsReducer";
import { CART_ACTIONS } from "./constans";
import { BUTTON_STATUS } from "../../components/GoodsPage";
import { Api } from "../../api";
import { setErrorMessage } from "../userReducer/actionCreators";

export const setCart = () => ({
  type: CART_ACTIONS.SET_CART,
});

export const setCartSuccess = (payload: GoodsCardType[]) => ({
  type: CART_ACTIONS.SET_CART_SUCCESS,
  payload,
});

export const setCartFailure = () => ({
  type: CART_ACTIONS.SET_CART_FAILURE,
});

export const fetchCart =
  () => async (dispatch: any, _getState: unknown, api: Api) => {
    dispatch(setCart());
    try {
      const resp = await api.getСart();
      if (typeof resp !== "string") {
        dispatch(setCartSuccess(resp));
      } else {
        dispatch(setErrorMessage(resp));
        throw new Error("ошибка");
      }
    } catch (error) {
      dispatch(setCartFailure());
    }
  };

export const changeCart =
  (data: GoodsCardType, status: string) =>
  async (dispatch: any, _getState: unknown, api: Api) => {
    let method = "";
    status === BUTTON_STATUS.delFromCart
      ? (method = "DELETE")
      : (method = "PUT");
    try {
      dispatch(setCart());
      const resp = await api.changeCart(data, method);
      if (typeof resp !== "string") {
        dispatch(fetchCart());
      } else {
        dispatch(setErrorMessage(resp));
        throw new Error("ошибка");
      }
    } catch (err) {
      dispatch(setCartFailure());
    }
  };
