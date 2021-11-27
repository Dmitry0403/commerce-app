import { LOAD_STATUSES } from "../constatns";

export interface CartType {
  category: string;
  id: number;
}

export interface CartStateType {
  cart: CartType[];
  loadStatus: LOAD_STATUSES;
}

export enum CART_ACTIONS {
  SET_CART = "setCart",
  SET_CART_SUCCESS = "setCartSuccess",
  SET_CART_FAILURE = "setCartFalure",
  PUT_IN_CART = "putInCart",
  DEL_FROM_CART = "delFromCart"
}
