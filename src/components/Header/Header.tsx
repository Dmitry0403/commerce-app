import { Layout, Input } from "antd";
import { Link } from "react-router-dom";
import css from "./styles.module.css";

export const Header: React.FC = () => {
  const { Header } = Layout;
  const { Search } = Input;
  return (
    <Header>
      <Link to="/">
        <div className={css.logos} />
      </Link>
      <Search placeholder="введите название товара" style={{ width: 500 }} />
    </Header>
  );
};
