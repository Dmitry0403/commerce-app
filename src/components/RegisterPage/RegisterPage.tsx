import { useState } from "react";
import css from "./styles.module.css";
import { Input, notification, Switch } from "antd";
import { LINKS } from "../App";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { getSideMenuItems } from "../../store/categoriesReducer";

interface UserType {
  name: string;
  surname?: string;
  email: string;
  password: string;
  gender?: string;
  interests: string[];
  isSubscribe: boolean;
  secretType: string;
  secretAnswer: string;
  bornAt: string;
}

interface RegisterProps {
  changeLoginStatus: () => void;
}

export const RegisterPage: React.FC<RegisterProps> = (props) => {
  const navigate = useNavigate();
  const categories = useSelector(getSideMenuItems);
  const [confirmPass, setConfirmPass] = useState("");
  const [user, setUser] = useState<UserType>({
    name: "",
    surname: "",
    email: "",
    password: "",
    gender: "",
    interests: [],
    isSubscribe: true,
    secretType: "",
    secretAnswer: "",
    bornAt: "",
  });

  const [errors, setErrors] = useState<UserType>({
    name: "",
    surname: "",
    email: "",
    password: "",
    gender: "",
    interests: [],
    isSubscribe: true,
    secretType: "",
    secretAnswer: "",
    bornAt: "",
  });

  let schema = yup.object().shape({
    secretType: yup.string(),
    secretAnswer: yup.string(),
    bornAt: yup.date().min(1930.01, "не старше 1930 года рождения"),
    isSubscribe: yup.boolean(),
    interests: yup.array().min(2, "выберете мин 2 категории"),
    gender: yup.string(),
    password: yup
      .string()
      .min(6, "минимум 6 символов")
      .required("обязательное поле"),
    email: yup.string().email().required("обязательное поле"),
    surname: yup.string().min(2, "минимум 2 символа"),
    name: yup
      .string()
      .min(2, "минимум 2 символа")
      .required("обязательное поле"),
  });

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [target.name]: "",
    }));
    setUser((prevUser) => ({
      ...prevUser,
      [target.name]: target.value,
    }));
  };

  const handlerCheckbox = (value: string) => {
    if (user.interests.find((item) => item === value)) {
      setUser((prevState) => ({
        ...prevState,
        interests: prevState.interests.filter((item) => item !== value),
      }));
    } else {
      setUser((prevState) => ({
        ...prevState,
        interests: prevState.interests.concat([value]),
      }));
    }
  };

  const handlerSwitch = (value: boolean) => {
    setUser((prevState) => ({
      ...prevState,
      isSubscribe: value,
    }));
  };

  const handlerSubmit = () => {
    if (user.password !== confirmPass) {
      notification.open({
        message: "Пароли не совпадают",
        duration: 1.7,
      });
      return;
    }

    if (user.secretType) {
      if (!user.secretAnswer) {
        setErrors((prevState) => ({
          ...prevState,
          secretAnswer: "введите ответ на секретный вопрос",
        }));
        return;
      }
    }

    schema
      .validate(user)
      .then((value) => {
        if (value) {
          notification.open({
            message: "Вы успешно прошли регистрацию",
            duration: 1.6,
          });
          setTimeout(() => {
            navigate(LINKS.start);
            props.changeLoginStatus();
          }, 1700);
        } else throw new Error();
      })
      .catch((err) => {
        const errorKey = err.path;
        const errorMessage = err.errors[0];
        notification.open({
          message: "Проверьте корректность заполнения формы",
          duration: 1.5,
        });
        setErrors((prevErrors) => ({
          ...prevErrors,
          [errorKey]: errorMessage,
        }));
      });
  };

  return (
    <div className={css.wrapper}>
      <h1>Регистрация</h1>

      <div className={css.userForm}>
        <section>
          <div className={css.inputItem}>
            <label>Имя:</label>
            <Input
              type="text"
              value={user.name}
              name="name"
              className={errors.name ? css.error : css.userInput}
              onChange={handlerChange}
            />
            <div className={css.errorMessage}>{errors.name}</div>
          </div>
          <div className={css.inputItem}>
            <label>Фамилия:</label>
            <Input
              type="text"
              value={user.surname}
              name="surname"
              className={errors.surname ? css.error : css.userInput}
              onChange={handlerChange}
            />
            <div className={css.errorMessage}>{errors.surname}</div>
          </div>
          <div className={css.inputItem}>
            <label>Почта:</label>
            <Input
              type="email"
              value={user.email}
              name="email"
              className={errors.email ? css.error : css.userInput}
              onChange={handlerChange}
            />
            <div className={css.errorMessage}>{errors.email}</div>
          </div>
          <div className={css.inputItem}>
            <label>Пароль:</label>
            <Input.Password
              type="password"
              value={user.password}
              name="password"
              className={errors.password ? css.error : css.userInput}
              onChange={handlerChange}
            />
            <div className={css.errorMessage}>{errors.password}</div>
          </div>
          <div className={css.inputItem}>
            <label>Подтвердите пароль:</label>
            <Input.Password
              type="password"
              value={confirmPass}
              name="confirmPass"
              className={
                confirmPass === user.password ? css.userInput : css.error
              }
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>
          <div className={css.inputItem}>
            <label>Пол:</label>
            <Input
              type="radio"
              id="male"
              value="male"
              name="gender"
              onChange={handlerChange}
            />
            <label id="male">муж</label>
            <Input
              type="radio"
              id="femail"
              value="female"
              name="gender"
              onChange={handlerChange}
            />
            <label id="female">жен</label>
          </div>
        </section>
        <section>
          <div className={css.inputItem}>
            <label>Любимые категории:</label>
            {categories.map((item) => (
              <div key={item.id}>
                <Input
                  type="checkbox"
                  name="interests"
                  onClick={() => handlerCheckbox(item.type)}
                />
                <label>{item.label}</label>
              </div>
            ))}
            <div className={css.errorMessage}>{errors.interests}</div>
          </div>
          <div className={css.inputItem}>
            <label>Подписка на новости:</label>
            <Switch
              size="small"
              defaultChecked
              onChange={(checked) => handlerSwitch(checked)}
            />
          </div>
          <div className={css.inputItem}>
            <label>Дата рождения:</label>
            <Input
              type="date"
              value={user.bornAt}
              name="bornAt"
              onChange={handlerChange}
            />
            <div className={css.errorMessage}>{errors.bornAt}</div>
          </div>
          <div className={css.inputItem}>
            <label>Секретный вопрос:</label>
            <Input
              type="text"
              value={user.secretType}
              name="secretType"
              className={errors.secretType ? css.error : css.userInput}
              onChange={handlerChange}
            />
          </div>
          {user.secretType && (
            <div className={css.inputItem}>
              <label>ответ:</label>
              <Input
                type="text"
                value={user.secretAnswer}
                name="secretAnswer"
                className={errors.secretAnswer ? css.error : css.userInput}
                onChange={handlerChange}
              />
              <div className={css.errorMessage}>{errors.secretAnswer}</div>
            </div>
          )}
        </section>
      </div>
      <div className={css.linkBtn}>
        <button className={css.button} onClick={handlerSubmit}>
          Сохранить
        </button>
      </div>
      <div className={css.linkBtn}>
        <button className={css.button} onClick={() => navigate(LINKS.start)}>
          Отмена
        </button>
      </div>
    </div>
  );
};
