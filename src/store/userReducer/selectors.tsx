import { RootState } from "../store";

export const getUser = (state: RootState) => state.userData.user;

export const getUserToken = (state: RootState) => state.userData.user.token;

export const getIsAuth = (state: RootState) => state.userData.isAuth;

export const getErrorMessage = (state: RootState) =>
  state.userData.errorMessage;

export const getUserLoadStatus = (state: RootState) =>
  state.userData.loadStatus;
