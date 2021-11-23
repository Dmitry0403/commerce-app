import { RootState } from "../store";
import { createSelector } from "reselect";
import { CategoryListType } from "../../components/CategoryList/CategoryList";
import { takeDataPage } from "../dataPageReducer";

export const takePopGoods = (state: RootState): CategoryListType[] =>
  state.popGoodsList.popGoods;

export const takeDataCategoryPage = createSelector(
  takePopGoods,
  takeDataPage,
  (popGoods, dataPage) => {
    return popGoods.find((item) => item.category.type === dataPage.type);
  }
);

export const takeDataGoodsPage = createSelector(
  takePopGoods,
  takeDataPage,
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
