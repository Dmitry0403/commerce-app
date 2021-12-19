import { USER_ACTIONS, UserLoginType } from "./constans";

import { Api } from "../../api";
import { UserType } from "../../components/RegisterPage";
import { LOAD_STATUSES } from "../constatns";
import { userActions } from ".";

export const setUser = () => ({
  type: USER_ACTIONS.SET_USER,
});

export const setRegSuccess = () => ({
  type: USER_ACTIONS.SET_USER_SUCCESS,
});

export const setUserSuccess = (payload: UserLoginType) => ({
  type: USER_ACTIONS.SET_USER_SUCCESS,
  payload,
});

export const setUserFailure = () => ({
  type: USER_ACTIONS.SET_USER_FAILURE,
});

export const changeLoadStatus = (loadStatus: LOAD_STATUSES) => ({
  type: USER_ACTIONS.CHANGE_LOAD_STATUS,
  loadStatus,
});

export const fetchReg = (dataUser: UserType) => async (dispatch: any) => {
  dispatch(userActions.changeLoadStatus(LOAD_STATUSES.LOADING));
  try {
    const resp = await Api.prototype.getReg(dataUser);
    if (resp.ok) {
      dispatch(userActions.changeLoadStatus(LOAD_STATUSES.SUCCESS));
    }
  } catch (error) {
    dispatch(userActions.changeLoadStatus(LOAD_STATUSES.FAILURE));
  }
};

// export const fetchUser = (dataUser: UserType, path: string) => async (dispatch: any) => {
//   dispatch(setUser());
//   try {
//     const resp = await Api.prototype.getUser(dataUser, path);

//     dispatch(setUserSuccess(payload));
//   } catch (error) {
//     dispatch(setUserFailure());
//   }
// };
