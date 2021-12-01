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

  postCart(data: GoodsCardType) {
    fetch("/api/cart", { method: "PUT", body: JSON.stringify(data) });
  }

  delCart(data: GoodsCardType) {
    fetch("/api/cart", { method: "DELETE", body: JSON.stringify(data) });
  }
}
