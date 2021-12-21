import type { CategoryType } from "../store/categoriesReducer";
import type { CategoryListType } from "../components/CategoryList";
import type { GoodsType, GoodsCardType } from "../store/goodsReducer";
import type { UserRegType } from "../components/RegisterPage";
import type { UserType } from "../components/LoginPage";

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

  getСart(token: string): Promise<Response> {
    return fetch("/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  changeCart(
    data: GoodsCardType,
    method: string,
    token: string
  ): Promise<Response> {
    return fetch("/api/cart", {
      method: method,
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  }

  getUser(data: UserType | UserRegType, path: string): Promise<Response> {
    return fetch(`/api/${path}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}
