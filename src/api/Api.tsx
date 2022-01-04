import type { CategoryType } from "../store/categoriesReducer";
import type { CategoryListType } from "../components/CategoryList";
import type { GoodsType, GoodsCardType } from "../store/goodsReducer";
import type { UserRegType } from "../components/RegisterPage";
import type { UserType } from "../components/LoginPage";

interface ApiType {
  token: string;
  getCategories: (params: string) => Promise<{ categories: CategoryType[] }>;
  getPopularCategories: () => Promise<CategoryListType[]>;
  getGoods: (params: string) => Promise<GoodsType[]>;
  getСart: () => Promise<any>;
  changeCart: (data: GoodsCardType, method: string) => Promise<any>;
  getUser: (data: UserType | UserRegType, path: string) => Promise<any>;
}

export class Api implements ApiType {
  private static _instance: ApiType;
  public token = "";
  constructor(token = "") {
    if (Api._instance) {
      return Api._instance;
    }
    Api._instance = this;
    this.token = token;
  }

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

  getСart(): Promise<any> {
    return fetch("/api/cart", {
      headers: { Authorization: `Bearer ${this.token}` },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.text();
      }
    });
  }

  changeCart(data: GoodsCardType, method: string): Promise<any> {
    return fetch("/api/cart", {
      method: method,
      headers: { Authorization: `Bearer ${this.token}` },
      body: JSON.stringify(data),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.text();
      }
    });
  }

  getUser(data: UserType | UserRegType, path: string): Promise<any> {
    return fetch(`/api/${path}`, {
      method: "POST",
      body: JSON.stringify(data),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return resp.text();
      }
    });
  }
}
