import { CATEGORIES_ACTIONS, CategoryType } from "./constatns";


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
    const resp = await fetch("./data/data-categories.json");
    if (resp.ok) {
      const payload = await resp.json();
      dispatch(setCategoriesSuccess(payload.categories));
    } else throw new Error("error");
  } catch (error) {
    dispatch(setCategoriesFailure());
  }
};
