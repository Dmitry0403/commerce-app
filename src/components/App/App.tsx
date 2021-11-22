import "antd/dist/antd.css";
import { Routes, Route } from "react-router-dom";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { StartPage } from "../StartPage";
import { GoodsPage } from "../GoodsPage";
import { CategoryPage } from "../CategoryPage";

export const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/:type/:id" element={<GoodsPage />} />
        <Route path="/:type" element={<CategoryPage />} />
        <Route path="/" element={<StartPage />} />
      </Routes>
      <Footer />
    </div>
  );
};