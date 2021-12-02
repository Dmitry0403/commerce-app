import "antd/dist/antd.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { StartPage } from "../StartPage";
import { GoodsPage } from "../GoodsPage";
import { CategoryPage } from "../CategoryPage";
import { CartPage } from "../CartPage";

export const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<GoodsPage />} />
        <Route path="/category/:typeId" element={<CategoryPage />} />
        <Route path="/" element={<StartPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
};
