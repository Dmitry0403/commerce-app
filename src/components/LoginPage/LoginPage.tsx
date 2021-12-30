import { useEffect, useState } from "react";
import css from "./styles.module.css";
import { Input } from "antd";
import { LINKS } from "../App";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { userSelectors, userActions } from "../../store/userReducer";
import { LOAD_STATUSES } from "../../store/constatns";
import { Loader } from "../Loader";

export interface UserType {
  login: string;
  password: string;
}

interface StateType {
  values: UserType;
  errors: UserType;
}

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorMessage = useSelector(userSelectors.getErrorMessage);
  const loadStatus = useSelector(userSelectors.getUserLoadStatus);
  const [state, setState] = useState<StateType>({
    values: { login: "", password: "" },
    errors: { login: "", password: "" },
  });

  useEffect(() => {
    if (!state.values.login) {
      dispatch(userActions.changeLoadStatus(LOAD_STATUSES.START));
    }
  }, [dispatch, navigate, state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setState((prevState) => ({
      values: { ...prevState.values, [target.name]: target.value },
      errors: { ...prevState.errors, [target.name]: "" },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.values.login.trim()) {
      setState((prevState) => ({
        errors: { ...prevState.errors, login: "обязательное поле" },
        values: { ...prevState.values, login: "" },
      }));
      return;
    }
    if (!state.values.password.trim()) {
      setState((prevState) => ({
        errors: { ...prevState.errors, password: "обязательное поле" },
        values: { ...prevState.values, password: "" },
      }));
      return;
    }
    dispatch(userActions.fetchLogin(state.values));
  };

  const {
    values: { login, password },
    errors: { login: errorLogin, password: errorPass },
  } = state;

  return (
    <div>
      {loadStatus === LOAD_STATUSES.START && (
        <div className={css.wrapper}>
          <h1>Введите логин и пароль</h1>
          <form className={css.userForm} onSubmit={handleSubmit}>
            <div>
              <label>Ваш логин:</label>
              <div>
                <Input
                  type="text"
                  value={login}
                  name="login"
                  className={errorLogin ? css.error : css.userName}
                  onChange={handleChange}
                  placeholder={errorLogin}
                />
              </div>
            </div>
            <div>
              <label>Ваш пароль:</label>
              <div>
                <Input
                  type="password"
                  value={password}
                  name="password"
                  className={errorPass ? css.error : css.userPass}
                  onChange={handleChange}
                  placeholder={errorPass}
                />
              </div>
            </div>
            <button type="submit" className={css.button}>
              Войти
            </button>
          </form>
          <div className={css.linkBtn}>
            <button className={css.button} onClick={() => navigate(LINKS.reg)}>
              Регистрация
            </button>
          </div>
        </div>
      )}
      {loadStatus === LOAD_STATUSES.LOADING && <Loader />}
      {loadStatus === LOAD_STATUSES.FAILURE && (
        <div className={css.errorPage}>
          {errorMessage},
          <span onClick={() => navigate(-1)}>вернуться назад </span>
        </div>
      )}
    </div>
  );
};
