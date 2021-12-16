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
  let [status, setStatus] = useState(false);

  const changeStatus = () => {
    setStatus((prevState) => (status = !prevState));
  };

  return (
    <div>
      <Header status={status} changeLoginStatus={changeStatus}/>
      <Routes>
        <Route
          path={LINKS.logo}
          element={<LoginPage changeLoginStatus={changeStatus} />}
        />
        <Route
          path={LINKS.reg}
          element={<RegisterPage changeLoginStatus={changeStatus} />}
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
