import { LOAD_STATUSES } from "../constatns";
import { GoodsCardType } from "../goodsReducer";


export interface CartType {
  carts: GoodsCardType[]
}

export interface CartStateType {
  cart: GoodsCardType[];
  loadStatus: LOAD_STATUSES;
}

export enum CART_ACTIONS {
  SET_CART = "cartData/setCart",
  SET_CART_SUCCESS = "cartData/setCartSuccess",
  SET_CART_FAILURE = "cartData/setCartFalure",
  PUT_IN_CART = "cartData/putInCart",
  DEL_FROM_CART = "cartData/delFromCart",
}
