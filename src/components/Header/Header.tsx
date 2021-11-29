import { Layout, Input, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import css from "./styles.module.css";
import { useEffect } from "react";
import { cartActions, getCart } from "../../store/cartReducer";
import { useDispatch, useSelector } from "react-redux";


export const Header: React.FC = () => {
  const { Header } = Layout;
  const { Search } = Input;
  const dispatch = useDispatch()

  useEffect(() =>{
    dispatch(cartActions.fetchCart())
  },[dispatch])
  
  const cart = useSelector(getCart)
  const amountCart = cart.length

  return (
    <Header className={css.headerStyle}>
      <Link to="/">
        <div className={css.logos} />
      </Link>
      <Search placeholder="введите название товара" style={{ width: 500 }} />
      <Link to="/cart">
        <Badge count={amountCart}>
          <ShoppingCartOutlined />
        </Badge>
      </Link>
    </Header>
  );
};
