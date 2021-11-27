import { GoodsCardType } from "../../components/GoodsCard";
import type { CartType } from "./constans";
import { CART_ACTIONS } from "./constans";
import { BUTTON_STATUS } from "../../components/GoodsPage";

export const setCart = () => ({
  type: CART_ACTIONS.SET_CART,
});

export const setCartSuccess = (payload: CartType[]) => ({
  type: CART_ACTIONS.SET_CART_SUCCESS,
  payload,
});

export const setCartFailure = () => ({
  type: CART_ACTIONS.SET_CART_FAILURE,
});

export const putInCart = (goodsInCart: CartType) => ({
  type: CART_ACTIONS.PUT_IN_CART,
  goodsInCart,
});

export const delFromCart = (goodsFromCart: CartType) => ({
  type: CART_ACTIONS.DEL_FROM_CART,
  goodsFromCart,
});

export const fetchCart = () => async (dispatch: any) => {
  dispatch(setCart());
  try {
    const resp = await fetch("/");
    if (resp.ok) {
      const payload = await resp.json();
      dispatch(setCartSuccess(payload));
    } else throw new Error("error");
  } catch (error) {
    dispatch(setCartFailure());
  }
};

export const changeCart =
  (data: GoodsCardType, status: string) => (dispatch: any) => {
    const goods: CartType = {
      category: data.category_type,
      id: data.id,
    };
    status === BUTTON_STATUS.delFromCart
      ? dispatch(delFromCart(goods))
      : dispatch(putInCart(goods));
  };
