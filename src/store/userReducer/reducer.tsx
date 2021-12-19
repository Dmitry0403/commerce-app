import { LOAD_STATUSES } from "../constatns";
import { Action } from "redux";
import { USER_ACTIONS } from "./constans";
import type { UserStateType, UserLoginType } from "./constans";

const INITIAL_STATE = {
  user: { login: "", token: "", isAuth: false },
  loadStatus: LOAD_STATUSES.UNKNOWN,
};

export const userReducer = (
  store: UserStateType = INITIAL_STATE,
  action: Action<USER_ACTIONS>
): UserStateType => {
  switch (action.type) {
    case USER_ACTIONS.CHANGE_LOAD_STATUS:
      let { loadStatus } = action as {
        type: USER_ACTIONS.CHANGE_LOAD_STATUS;
        loadStatus: LOAD_STATUSES;
      };
      return {
        ...store,
        loadStatus
      };
    case USER_ACTIONS.SET_USER:
      return {
        ...store,
        loadStatus: LOAD_STATUSES.LOADING,
      };
    case USER_ACTIONS.SET_USER_SUCCESS:
      let { payload } = action as {
        type: USER_ACTIONS.SET_USER_SUCCESS;
        payload: UserLoginType;
      };
      return {
        ...store,
        user: payload,
        loadStatus: LOAD_STATUSES.SUCCESS,
      };
    case USER_ACTIONS.SET_USER_FAILURE:
      return {
        ...store,
        loadStatus: LOAD_STATUSES.FAILURE,
      };
    default:
      return store;
  }
};
