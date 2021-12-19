import { LOAD_STATUSES } from "../constatns";

export interface UserTokenType {
  login: string;
  token: string;
}

export interface UserStateType {
  user: UserTokenType;
  isAuth: boolean;
  loadStatus: LOAD_STATUSES;
}

export enum USER_ACTIONS {
  CHANGE_LOAD_STATUS = "changeLoadStatus",
  SET_USER = "setUser",
  SET_USER_SUCCESS = "setUserSuccess",
  SET_USER_FAILURE = "setUserFalure",
}
