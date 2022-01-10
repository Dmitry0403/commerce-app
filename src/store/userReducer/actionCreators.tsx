import { USER_ACTIONS, UserTokenType } from "./constans";
import { UserRegType } from "../../components/RegisterPage";
import { UserType } from "../../components/LoginPage";
import { LOAD_STATUSES } from "../constatns";
import { notification } from "antd";
import { Api } from "../../api";

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

export const exitUser = () => (dispatch: any) => {
  dispatch(setUserExit());
  localStorage.removeItem("userToken");
};

export const fetchReg =
  (dataUser: UserRegType) =>
  async (dispatch: any, _getState: unknown, api: Api) => {
    dispatch(changeLoadStatus(LOAD_STATUSES.LOADING));
    try {
      const resp = await api.getUser(dataUser, "registration");
      if (typeof resp !== "string") {
        dispatch(changeLoadStatus(LOAD_STATUSES.SUCCESS));
        notification.open({
          message: "Вы успешно прошли регистрацию",
          duration: 2,
        });
      } else {
        dispatch(setErrorMessage(resp));
        throw new Error("ошибка");
      }
    } catch (error) {
      dispatch(changeLoadStatus(LOAD_STATUSES.FAILURE));
    }
  };

export const fetchLogin =
  (loginUser: UserType) =>
  async (dispatch: any, _getState: unknown, api: Api) => {
    dispatch(changeLoadStatus(LOAD_STATUSES.LOADING));
    try {
      const resp = await api.getUser(loginUser, "login");
      if (typeof resp !== "string") {
        localStorage.setItem("userToken", JSON.stringify(resp) as string);
        notification.open({
          message: "Вы успешно прошли авторизацию",
          duration: 2,
        });
        api.token = resp.token
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
    const user: UserTokenType = JSON.parse(
      localStorage.getItem("userToken") as string
    );
    dispatch(setUserSuccess(user));
  }
};
