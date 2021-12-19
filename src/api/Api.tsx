import type { CategoryType } from "../store/categoriesReducer";
import type { CategoryListType } from "../components/CategoryList";
import type { GoodsType, GoodsCardType } from "../store/goodsReducer";
import type { CartType } from "../store/cartReducer";
import type { UserType } from "../components/RegisterPage";

export class Api {
  getCategories(params: string): Promise<{ categories: CategoryType[] }> {
    return fetch(`/api/categories?${params}`).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    });
  }

  getPopularCategories(): Promise<CategoryListType[]> {
    return fetch("/api/popular_categories").then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    });
  }

  getGoods(params: string): Promise<GoodsType[]> {
    return fetch(`/api/goods?${params}`).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    });
  }

  getСart(): Promise<GoodsCardType[]> {
    return fetch("/api/cart")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((resp: CartType) => resp.carts);
  }

  changeCart(data: GoodsCardType, method: string): Promise<Response> {
    return fetch("/api/cart", {
      method: method,
      body: JSON.stringify(data),
    });
  }

  getReg(data: any): Promise<Response> {
    return fetch(`/api/registration`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((resp) => {
        if (resp.ok) {
          return resp
        } else {
          throw new Error("ошибка");
        }
      })
      .catch();
  }
}
