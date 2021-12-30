import { LOAD_STATUSES } from "../constatns";

export interface UserTokenType {
  login: string;
  token: string;
}

export interface UserStateType {
  user: UserTokenType;
  isAuth: boolean;
  errorMessage: string;
  loadStatus: LOAD_STATUSES;
}

export enum USER_ACTIONS {
  CHANGE_LOAD_STATUS = "userData/changeLoadStatus",
  SET_USER = "userData/setUser",
  SET_USER_SUCCESS = "userData/setUserSuccess",
  SET_USER_FAILURE = "userData/setUserFalure",
  SET_ERROR_MESSAGE = "userData/setErrorMessage",
  SET_USER_EXIT = "userData/setUsetExit"
}
