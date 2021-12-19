import { LOAD_STATUSES } from "../constatns";


export interface UserLoginType {
  login: string;
  token: string;
  isAuth: boolean;
}

export interface UserStateType {
  user: UserLoginType;
  loadStatus: LOAD_STATUSES;
}

export enum USER_ACTIONS {
  CHANGE_LOAD_STATUS = "changeLoadStatus",
  SET_USER = "setUser",
  SET_USER_SUCCESS = "setUserSuccess",
  SET_USER_FAILURE = "setUserFalure",
}
