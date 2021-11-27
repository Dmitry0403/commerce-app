import { RootState } from "../store";
import { createSelector } from "reselect";
import { CategoryListType } from "../../components/CategoryList/CategoryList";
import { getParamsPage } from "../paramsPageReducer";

export const getPopGoods = (state: RootState): CategoryListType[] =>
  state.popGoodsList.popGoods;

export const getDataCategoryPage = createSelector(
  getPopGoods,
  getParamsPage,
  (popGoods, paramsPage) => {
    return popGoods.find((item) => item.category.type === paramsPage.type);
  }
);

export const getDataGoodsPage = createSelector(
  getDataCategoryPage,
  getParamsPage,
  (selectedCategory, paramsPage) => {
    if (selectedCategory) {
      return selectedCategory.items.find(
        (item) => item.id === Number(paramsPage.id)
      );
    }
  }
);
