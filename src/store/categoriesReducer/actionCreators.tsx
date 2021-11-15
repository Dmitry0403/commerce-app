import { CATEGORIES_ACTIONS, CategoryType } from "./constatns";


export const getCategoryItems = () => ({
  type: CATEGORIES_ACTIONS.GET_CATEGORIES,
});

export const getCategoriesSuccess = (payload: CategoryType[]) => ({
  type: CATEGORIES_ACTIONS.GET_CATEGORIES_SUCCESS,
  payload,
});

export const getCategoriesFailure = () => ({
  type: CATEGORIES_ACTIONS.GET_CATEGORIES_FAILURE,
});

export const fetchCategoryItems = () => async (dispatch: any) => {
  dispatch(getCategoryItems());
  try {
    const resp = await fetch("./data/data-categories.json");
    if (resp.ok) {
      const payload = await resp.json();
      dispatch(getCategoriesSuccess(payload.categories));
    } else throw new Error("error");
  } catch (error) {
    dispatch(getCategoriesFailure());
  }
};
