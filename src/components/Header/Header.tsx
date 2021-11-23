import { Layout, Input, Menu } from "antd";
import { Link } from "react-router-dom";
import css from "./styles.module.css";

export const Header: React.FC = () => {
  const { Header } = Layout;
  const { Search } = Input;
  return (
    <Header className={css.header}>
      <Link to="/">
        <div className={css.logos} />
      </Link>
      <Menu theme="light" mode="horizontal">
        <Search placeholder="введите название товара" style={{ width: 500 }} />
      </Menu>
    </Header>
  );
};
