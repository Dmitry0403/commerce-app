import { useEffect, useState } from "react";
import css from "./styles.module.css";
import { Input, notification, Switch } from "antd";
import { LINKS } from "../App";
import { useNavigate } from "react-router";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { sideMenuSelectors, menuActions } from "../../store/categoriesReducer";
import { userSelectors, userActions } from "../../store/userReducer";
import { LOAD_STATUSES } from "../../store/constatns";
import { Loader } from "../Loader";

export const getDataForFetch = (obj: any) => {
  let newObj: any = {};
  for (let key in obj) {
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
};

export interface UserRegType {
  name: string;
  surname?: string;
  email: string;
  password: string;
  confirmPass?: string;
  gender?: string;
  interests: number[];
  isSubscribe: boolean;
  secretType: string;
  secretAnswer: string;
  bornAt?: string;
}

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(sideMenuSelectors.getSideMenuItems);
  const loadStatus = useSelector(userSelectors.getUserLoadStatus);
  const errorMessage = useSelector(userSelectors.getErrorMessage);
  const [user, setUser] = useState<UserRegType>({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPass: "",
    gender: "",
    interests: [],
    isSubscribe: true,
    secretType: "",
    secretAnswer: "",
    bornAt: undefined,
  });

  const [errors, setErrors] = useState<UserRegType>({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPass: "",
    gender: "",
    interests: [],
    isSubscribe: true,
    secretType: "",
    secretAnswer: "",
    bornAt: "",
  });

  let schema = yup.object().shape({
    secretType: yup.string(),
    secretAnswer: yup.string().when("secretType", {
      is: (secretType: string) => Boolean(secretType),
      then: yup.string().required("введите ответ на секретный вопрос"),
    }),
    bornAt: yup
      .date()
      .test((value) => Boolean(value))
      .required("обязательное поле")
      .min(1930.01, "не старше 1930 года рождения"),
    isSubscribe: yup.boolean(),
    interests: yup.array().min(2, "выберете мин 2 категории"),
    gender: yup.string(),
    password: yup
      .string()
      .min(6, "минимум 6 символов")
      .required("обязательное поле"),
    confirmPass: yup
      .string()
      .test(
        `is-${user.password}`,
        "пароли не совпадают",
        (value) => value === user.password
      ),
    email: yup.string().email().required("обязательное поле"),
    surname: yup.string().min(2, "минимум 2 символа"),
    name: yup
      .string()
      .min(2, "минимум 2 символа")
      .required("обязательное поле"),
  });

  useEffect(() => {
    if (!user.name) {
      dispatch(userActions.changeLoadStatus(LOAD_STATUSES.START));
      dispatch(menuActions.fetchCategoryItems(""));
    }
    if (loadStatus === LOAD_STATUSES.SUCCESS) {
      notification.open({
        message: "Вы успешно прошли регистрацию",
        duration: 2,
      });
      navigate(LINKS.logo);
      dispatch(userActions.changeLoadStatus(LOAD_STATUSES.START));
    }
  }, [dispatch, loadStatus, navigate, user]);

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

  const handlerCheckbox = (value: number) => {
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
    setErrors((prevErrors) => ({
      ...prevErrors,
      interests: [],
    }));
  };

  const handlerSwitch = (value: boolean) => {
    setUser((prevState) => ({
      ...prevState,
      isSubscribe: value,
    }));
  };

  const fetchDataUser = (data: UserRegType) => {
    const dataUser = {
      name: data.name,
      surname: data.surname,
      login: data.email,
      password: data.password,
      gender: data.gender,
      interests: data.interests,
      isSubscribe: data.isSubscribe,
      secret: data.secretType
        ? { type: data.secretType, answer: data.secretAnswer }
        : data.secretType,
      bornAt: data.bornAt,
    };
    const dataUserForFetch = getDataForFetch(dataUser);
    dispatch(userActions.fetchReg(dataUserForFetch));
  };

  const handlerSubmit = () => {
    schema
      .validate(user, { abortEarly: false })
      .then((value) => {
        if (value) {
          fetchDataUser(user);
        } else throw new Error();
      })
      .catch((err) => {
        const ValidationError = err.inner;
        ValidationError.map((item: any) =>
          setErrors((prevErrors) => ({
            ...prevErrors,
            [item.params.path]: item.errors[0],
          }))
        );
        notification.open({
          message: "Проверьте корректность заполнения формы",
          duration: 1.5,
        });
      });
  };

  return (
    <div>
      {loadStatus === LOAD_STATUSES.START && (
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
                  value={user.confirmPass}
                  name="confirmPass"
                  className={
                    user.confirmPass === user.password
                      ? css.userInput
                      : css.error
                  }
                  onChange={handlerChange}
                />
                <div className={css.errorMessage}>{errors.confirmPass}</div>
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
                      onClick={() => handlerCheckbox(item.id)}
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
            <button
              className={css.button}
              onClick={() => navigate(LINKS.start)}
            >
              Отмена
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
