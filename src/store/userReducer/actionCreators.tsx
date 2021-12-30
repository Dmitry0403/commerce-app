import { USER_ACTIONS, UserTokenType } from "./constans";
import { Api } from "../../api";
import { UserRegType } from "../../components/RegisterPage";
import { UserType } from "../../components/LoginPage";
import { LOAD_STATUSES } from "../constatns";
import { notification } from "antd";


export const setUserSuccess = (payload: UserTokenType) => ({
  type: USER_ACTIONS.SET_USER_SUCCESS,
  payload,
});

export const changeLoadStatus = (payload: LOAD_STATUSES) => ({
  type: USER_ACTIONS.CHANGE_LOAD_STATUS,
  loadStatus: payload,
});

export const setUserExit = () => ({
  type: USER_ACTIONS.SET_USER_EXIT,
});

export const setErrorMessage = (payload: string) => ({
  type: USER_ACTIONS.SET_ERROR_MESSAGE,
  errorMessage: payload,
});

export const fetchReg = (dataUser: UserRegType) => async (dispatch: any) => {
  dispatch(changeLoadStatus(LOAD_STATUSES.LOADING));
  try {
    const resp = await Api.prototype.getUser(dataUser, "registration");
    if (typeof(resp) !== "string") {
      dispatch(changeLoadStatus(LOAD_STATUSES.SUCCESS));
    } else {
      dispatch(setErrorMessage(resp));
      throw new Error("ошибка");
    }
  } catch (error) {
    dispatch(changeLoadStatus(LOAD_STATUSES.FAILURE));
  }
};

export const fetchLogin = (loginUser: UserType) => async (dispatch: any) => {
  dispatch(changeLoadStatus(LOAD_STATUSES.LOADING));
  try {
    const resp = await Api.prototype.getUser(loginUser, "login");
    if (typeof(resp) !== "string") {
      localStorage.setItem("userToken", JSON.stringify(resp) as string);
      notification.open({
        message: "Вы успешно прошли авторизацию",
        duration: 2,
      });
      dispatch(setUserSuccess(resp));
    } else {
      dispatch(setErrorMessage(resp));
      throw new Error("ошибка");
    }
  } catch (error) {
    dispatch(changeLoadStatus(LOAD_STATUSES.FAILURE));
  }
};

export const getTokenFromStorage = () => (dispatch: any) => {
  if (localStorage.getItem("userToken")) {
    const user: UserTokenType = JSON.parse(localStorage.getItem("userToken") as string);
    dispatch(setUserSuccess(user));
  }
};
