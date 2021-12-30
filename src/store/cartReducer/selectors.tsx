import { RootState } from "../store";

export const getCart = (state:RootState) => state.cartData.cart

export const getCartLoadStatus = (state:RootState) => state.cartData.loadStatus



