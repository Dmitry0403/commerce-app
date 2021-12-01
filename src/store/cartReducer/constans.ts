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
  SET_CART = "setCart",
  SET_CART_SUCCESS = "setCartSuccess",
  SET_CART_FAILURE = "setCartFalure",
  PUT_IN_CART = "putInCart",
  DEL_FROM_CART = "delFromCart",
}
