import type { CartStateType } from "./constans";
import type { GoodsCardType } from "../goodsReducer";
import { CART_ACTIONS } from "./constans";
import { LOAD_STATUSES } from "../constatns";
import { Action } from "redux";

const INITIAL_STATE = { cart: [], loadStatus: LOAD_STATUSES.UNKNOWN };

export const cartReducer = (
  store: CartStateType = INITIAL_STATE,
  action: Action<CART_ACTIONS>
): CartStateType => {
  switch (action.type) {
    case CART_ACTIONS.SET_CART:
      return {
        ...store,
        loadStatus: LOAD_STATUSES.LOADING,
      };
    case CART_ACTIONS.SET_CART_SUCCESS:
      let { payload } = action as {
        type: CART_ACTIONS.SET_CART_SUCCESS;
        payload: GoodsCardType[];
      };
      return {
        ...store,
        cart: payload,
        loadStatus: LOAD_STATUSES.SUCCESS,
      };
    case CART_ACTIONS.SET_CART_FAILURE:
      return {
        ...store,
        loadStatus: LOAD_STATUSES.FAILURE,
      };
    case CART_ACTIONS.PUT_IN_CART:
      const { goodsInCart } = action as {
        type: CART_ACTIONS.PUT_IN_CART;
        goodsInCart: GoodsCardType;
      };
      const inCart = store.cart.concat([goodsInCart]);
      return {
        ...store,
        cart: inCart,
      };
    case CART_ACTIONS.DEL_FROM_CART:
      const { goodsFromCart } = action as {
        type: CART_ACTIONS.DEL_FROM_CART;
        goodsFromCart: GoodsCardType;
      };
      const fromCart = store.cart.filter(
        (item) => item.id !== goodsFromCart.id
      );
      return {
        ...store,
        cart: fromCart,
      };
    default:
      return store;
  }
};
