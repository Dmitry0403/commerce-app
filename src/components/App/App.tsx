import "antd/dist/antd.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { StartPage } from "../StartPage";
import { GoodsPage } from "../GoodsPage";
import { CategoryPage } from "../CategoryPage";
import { CartPage } from "../CartPage";
import { GoodsTablePage } from "../GoodsTablePage";
import { LoginPage } from "../LoginPage";
import { RegisterPage } from "../RegisterPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelectors, userActions } from "../../store/userReducer";
import css from "./styles.module.css"

export enum LINKS {
  start = "/",
  product = "/product",
  category = "/category",
  logo = "/login",
  reg = "/reg",
  cart = "/cart",
  table = "/table",
  id = "/:id",
  typeId = "/:typeId",
}

export const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(userSelectors.getIsAuth);

  useEffect(() => {
    dispatch(userActions.getTokenFromStorage());
  }, [dispatch]);

  return (
    <div className={css.wrapper}>
      <Header />
      <Routes>
        <Route
          path={LINKS.logo}
          element={isAuth ? <Navigate to={LINKS.start} /> : <LoginPage />}
        />
        <Route
          path={LINKS.reg}
          element={isAuth ? <Navigate to={LINKS.start} /> : <RegisterPage />}
        />
        <Route path={LINKS.table} element={<GoodsTablePage />} />
        <Route path={LINKS.cart} element={<CartPage />} />
        <Route path={LINKS.product + LINKS.id} element={<GoodsPage />} />
        <Route
          path={LINKS.category + LINKS.typeId}
          element={<CategoryPage />}
        />
        <Route path={LINKS.start} element={<StartPage />} />
        <Route path="*" element={<Navigate to={LINKS.start} />} />
      </Routes>
      <Footer />
    </div>
  );
};
