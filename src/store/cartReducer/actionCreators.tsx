import { GoodsCardType } from "../../store/goodsReducer";
import { CART_ACTIONS } from "./constans";
import { BUTTON_STATUS } from "../../components/GoodsPage";
import { Api } from "../../api";

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

export const fetchCart = () => async (dispatch: any) => {
  dispatch(setCart());
  try {
    const payload = await Api.prototype.getСart();
    dispatch(setCartSuccess(payload));
  } catch (error) {
    dispatch(setCartFailure());
  }
};

export const changeCart =
  (data: GoodsCardType, status: string) => async (dispatch: any) => {
    let method = "";
    status === BUTTON_STATUS.delFromCart
      ? (method = "DELETE")
      : (method = "PUT");
    const resp = await Api.prototype.changeCart(data, method);
    if (resp.ok) {
      dispatch(fetchCart());
    }
  };
