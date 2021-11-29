import { CATEGORIES_ACTIONS, CategoryType } from "./constatns";
import { Api } from "../../api";

export const setCategoryItems = () => ({
  type: CATEGORIES_ACTIONS.SET_CATEGORIES,
});

export const setCategoriesSuccess = (payload: CategoryType[]) => ({
  type: CATEGORIES_ACTIONS.SET_CATEGORIES_SUCCESS,
  payload,
});

export const setCategoriesFailure = () => ({
  type: CATEGORIES_ACTIONS.SET_CATEGORIES_FAILURE,
});

export const fetchCategoryItems = () => async (dispatch: any) => {
  dispatch(setCategoryItems());
  try {
    const payload = await Api.prototype.getCategories();
    dispatch(setCategoriesSuccess(payload.categories));
  } catch (error) {
    dispatch(setCategoriesFailure());
  }
};
