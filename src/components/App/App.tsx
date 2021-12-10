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
import { useState } from "react";

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
  const [isLogin, setIsLogin] = useState(false);

  const changeLogin = () => {
    setIsLogin(true);
  };

  if (isLogin) {
    return (
      <div>
        <Header />
        <Routes>
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
  } else {
    return (
      <Routes>
        <Route path={LINKS.logo} element={<LoginPage changeStatus={changeLogin}/>} />
        <Route path={LINKS.reg} element={<RegisterPage changeStatus={changeLogin}/>} />
        <Route path="*" element={<Navigate to={LINKS.logo} />} />
      </Routes>
    );
  }
};
