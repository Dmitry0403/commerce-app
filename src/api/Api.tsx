import type { CategoryType } from "../store/categoriesReducer";
import { CategoryListType } from "../components/CategoryList";
import type { GoodsType, GoodsCardType } from "../store/goodsReducer";
import type { CartType } from "../store/cartReducer";

// interface GoodsCardTypeFromBack {
//   id: string;
//   categoryTypeId: string;
//   label: string;
//   price: string;
//   img: string;
//   description: string;
// }

// interface GoodsTypeFromBack {
//   items: GoodsCardTypeFromBack[];
//   total: number;
// }

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
}
