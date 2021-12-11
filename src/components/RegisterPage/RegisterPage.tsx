import { useEffect, useState } from "react";
import css from "./styles.module.css";
import { Input,  notification } from "antd";
import { Link } from "react-router-dom";
import { LINKS } from "../App";
import { useNavigate } from "react-router";

interface UserType {
  login: string;
  password: string;
}

interface StateType {
  usersArray: UserType[];
  values: UserType;
  errors: UserType;
}

interface RegisterProps {
  changeStatus: () => void;
}

export const RegisterPage: React.FC<RegisterProps> = (props) => {
  const [state, setState] = useState<StateType>({
    usersArray: [],
    values: { login: "", password: "" },
    errors: { login: "", password: "" },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("usersArray")) {
      const usersArray = JSON.parse(
        localStorage.getItem("usersArray") as string
      );
      setState((prevState) => ({
        ...prevState,
        usersArray,
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setState((prevState) => ({
      ...state,
      values: { ...prevState.values, [target.name]: target.value },
      errors: { ...prevState.errors, [target.name]: "" },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    let {
      usersArray,
      values: { login, password },
    } = state;

    e.preventDefault();

    if (!login.trim()) {
      setState((prevState) => ({
        ...state,
        errors: { ...prevState.errors, login: "введите логин" },
      }));
      return;
    }

    if (!password.trim()) {
      setState((prevState) => ({
        ...state,
        errors: { ...prevState.errors, password: "введите пароль" },
      }));
      return;
    }

    if (usersArray.find((user: UserType) => user.login === login)) {
      setState((prevState) => ({
        ...state,
        errors: {
          ...prevState.errors,
          login: "упс, такой логин уже есть",
        },
        values: { ...prevState.values, login: "", password: "" },
      }));
      return;
    }

    usersArray = usersArray.concat([
      {
        login,
        password,
      },
    ]);
    localStorage.setItem("usersArray", JSON.stringify(usersArray));

    notification.open({
      message: "Вы успешно прошли регистрацию",
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
      <h1>Регистрация</h1>
      <form className={css.userForm} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Введите логин:</label>
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
          <label>Введите пароль:</label>
          <div>
            <Input
              type="password"
              value={password}
              name="password"
              className={errorPass ? css.error : css.userPass}
              onChange={(e) => handleChange(e)}
              placeholder={errorPass}
            />
          </div>
        </div>
        <button type="submit" className={css.button}>
          Сохранить
        </button>
      </form>
      <div className={css.linkBtn}>
        <Link to={LINKS.logo}>
          <button className={css.button} onClick={() => navigate(LINKS.logo)}>
            Отмена
          </button>
        </Link>
      </div>
    </div>
  );
};
