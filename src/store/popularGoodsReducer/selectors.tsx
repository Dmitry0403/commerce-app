import { RootState } from "../store";
import { createSelector } from "reselect";
import { CategoryListType } from "../../components/CategoryList/CategoryList";
import { getDataPage } from "../dataPageReducer";

export const getPopGoods = (state: RootState): CategoryListType[] =>
  state.popGoodsList.popGoods;

export const getDataCategoryPage = createSelector(
  getPopGoods,
  getDataPage,
  (popGoods, dataPage) => {
    return popGoods.find((item) => item.category.type === dataPage.type);
  }
);

export const getDataGoodsPage = createSelector(
  getPopGoods,
  getDataPage,
  (popGoods, dataPage) => {
    const selectedCategory = popGoods.find(
      (item) => item.category.type === dataPage.goodsParams.category_type
    );
    if (selectedCategory) {
      return selectedCategory.items.find(
        (item) => item.id === Number(dataPage.goodsParams.id)
      );
    }
  }
);
