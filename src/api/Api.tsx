import type { CategoryType } from "../store/categoriesReducer";
import { CategoryListType } from "../components/CategoryList";
import type { CartType } from "../store/cartReducer";

// export interface GoodsCardTypeFromBack {
//   id: number;
//   categoryTypeId: string;
//   label: string;
//   price: number;
//   img: string;
//   description: string;
// }

// export interface CategoryListTypeFromBack {
//   category: CategoryType;
//   items: GoodsCardTypeFromBack[];
// }

export class Api {
  getCategories(): Promise<{ categories: CategoryType[] }> {
    return fetch("/api/categories").then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    });
  }

  // getPopularCategories(): Promise<CategoryListTypeFromBack[]> {
  //   return fetch("/api/popular_categories")
  //     .then((resp) => {
  //       if (resp.ok) {
  //         return resp.json();
  //       }
  //     })
  //     .then((resp) => ({...resp, content: description }))
  // }

  getPopularCategories(): Promise<CategoryListType[]> {
    return fetch("/api/popular_categories").then((resp) => {
      if (resp.ok) {
      return resp.json()
      }
    });
  }


  getСart(): Promise<CartType[]> {
    return fetch("/api/cart").then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    });
  }
}
