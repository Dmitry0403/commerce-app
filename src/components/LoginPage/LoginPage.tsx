import { useState } from "react";
import css from "./styles.module.css";
import { Input, notification } from "antd";
import { LINKS } from "../App";
import { useNavigate } from "react-router";

interface UserType {
  login: string;
  password: string;
}

interface StateType {
  values: UserType;
  errors: UserType;
}

interface LoginProps {
  changeStatus: () => void;
}

export const LoginPage: React.FC<LoginProps> = (props) => {
  const [state, setState] = useState<StateType>({
    values: { login: "", password: "" },
    errors: { login: "", password: "" },
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setState((prevState) => ({
      values: { ...prevState.values, [target.name]: target.value },
      errors: { ...prevState.errors, [target.name]: "" },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let usersArray: UserType[] = [];
    if (localStorage.getItem("usersArray")) {
      usersArray = JSON.parse(localStorage.getItem("usersArray") as string);
    }

    const {
      values: { login, password },
    } = state;

    const user: UserType | undefined = usersArray.find(
      (user: UserType) => user.login === login && user.password === password
    );

    if (!user) {
      setState((prevState) => ({
        errors: { ...prevState.errors, login: "неверный логин или пароль" },
        values: { ...prevState.values, login: "", password: "" },
      }));
      return;
    }
    notification.open({
      message: "Вы успешно прошли авторизацию",
      duration: 1.9,
    });

    setTimeout(() => {
      props.changeStatus();
    }, 2000);
  };

  const {
    values: { login, password },
    errors: { login: errorLogin, password: errorPass },
  } = state;

  return (
    <div className={css.wrapper}>
      <h1>Введите логин и пароль</h1>
      <form className={css.userForm} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Ваш логин:</label>
          <div>
            <Input
              type="text"
              value={login}
              name="login"
              className={errorLogin ? css.error : css.userName}
              onChange={(e) => handleChange(e)}
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
              className={css.userPass}
              onChange={(e) => handleChange(e)}
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
  );
};
