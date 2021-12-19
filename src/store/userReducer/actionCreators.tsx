import { USER_ACTIONS, UserTokenType } from "./constans";
import { Api } from "../../api";
import { UserRegType } from "../../components/RegisterPage";
import { UserType } from "../../components/LoginPage";
import { LOAD_STATUSES } from "../constatns";

export const setUserSuccess = (payload: UserTokenType) => ({
  type: USER_ACTIONS.SET_USER_SUCCESS,
  payload,
});

export const changeLoadStatus = (loadStatus: LOAD_STATUSES) => ({
  type: USER_ACTIONS.CHANGE_LOAD_STATUS,
  loadStatus,
});

export const fetchReg = (dataUser: UserRegType) => async (dispatch: any) => {
  dispatch(changeLoadStatus(LOAD_STATUSES.LOADING));
  try {
    const resp = await Api.prototype.getReg(dataUser);
    if (resp.ok) {
      dispatch(changeLoadStatus(LOAD_STATUSES.SUCCESS));
    }
  } catch (error) {
    dispatch(changeLoadStatus(LOAD_STATUSES.FAILURE));
  }
};

export const fetchUser = (loginUser: UserType) => async (dispatch: any) => {
  dispatch(changeLoadStatus(LOAD_STATUSES.LOADING));
  try {
    const resp = await Api.prototype.getUser(loginUser);
    if (resp.ok) {
      const userToken: UserTokenType = await resp.json();
      dispatch(setUserSuccess(userToken));
    } else {
      throw new Error("ошибка");
    }
  } catch (error) {
    dispatch(changeLoadStatus(LOAD_STATUSES.FAILURE));
  }
};
