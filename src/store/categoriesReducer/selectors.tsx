import { RootState } from "../store";

export const getSideMenuItems = (state:RootState) => state.categoryItems.categories
export const getLoadStatusMenu = (state:RootState) => state.categoryItems.loadStatus