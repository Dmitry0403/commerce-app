import { PARAMS_ACTION } from "./constans";
import type { GoodsParamsType, CartType } from "./constans";
import type { GoodsCardType } from "../../components/GoodsCard";

export const setCategoryParams = (payload: string) => ({
  type: PARAMS_ACTION.SET_CATEGORY_PARAMS,
  payload,
});

export const setGoodsParams = (params: GoodsParamsType) => ({
  type: PARAMS_ACTION.SET_GOODS_PARAMS,
  params,
});

export const setButtonStatus = (stateButton: string) => ({
  type: PARAMS_ACTION.SET_BUTTON_STATUS,
  stateButton,
});

export const addToCart = (data: GoodsCardType) => (dispatch: any) => {
  let cart: CartType[] = [];

  if (localStorage.getItem("Cart")) {
    cart = JSON.parse(localStorage.getItem("Cart") as string);
  }

  if (
    cart.find((item) => item.type === data.category_type && item.id === data.id)
  ) {
    alert("Товар уже в корзине");
    return;
  }

  const newGoodsInCart: CartType = {
    type: data.category_type as string,
    id: data.id as number,
  };

  const newCart = cart.concat([newGoodsInCart]);
  localStorage.setItem("Cart", JSON.stringify(newCart));

  dispatch(setButtonStatus("Уже в корзине"));
};
