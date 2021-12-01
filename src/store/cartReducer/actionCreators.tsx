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

export const putInCart = (goodsInCart: GoodsCardType) => ({
  type: CART_ACTIONS.PUT_IN_CART,
  goodsInCart,
});

export const delFromCart = (goodsFromCart: GoodsCardType) => ({
  type: CART_ACTIONS.DEL_FROM_CART,
  goodsFromCart,
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
    if (status === BUTTON_STATUS.delFromCart) {
      dispatch(delFromCart(data));
      Api.prototype.delCart(data);
    } else {
      dispatch(putInCart(data));
      Api.prototype.postCart(data);
    }
  };
