import {
  Layout,
  Badge,
  AutoComplete,
  Avatar,
  Button,
  notification,
} from "antd";
import { debounce } from "lodash";
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import css from "./styles.module.css";
import { useCallback, useEffect, useState } from "react";
import { cartActions, cartSelectors } from "../../store/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import { LINKS } from "../App";
import { goodsAction, goodsSelectors } from "../../store/goodsReducer";
import { LOAD_STATUSES } from "../../store/constatns";
import { userSelectors, userActions } from "../../store/userReducer";

export const Header = () => {
  const { Header } = Layout;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(userSelectors.getIsAuth);
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(cartActions.fetchCart());
  }, [dispatch]);

  const cart = useSelector(cartSelectors.getCart);
  let amountCart: number;
  amountCart = cart ? cart.length : 0;

  const btn = (
    <Button
      type="primary"
      onClick={() => {
        dispatch(userActions.exitUser());
        notification.close("close");
        navigate(LINKS.logo);
      }}
    >
      Да
    </Button>
  );

  const handlerChangeStatus = () => {
    status
      ? notification.open({
          message: "Выходите с аккаунта?",
          key: "close",
          btn,
        })
      : navigate(LINKS.logo);
  };

  const selectGoods = (value: string) => {
    setValue(value);
    if (value) {
      dispatch(goodsAction.fetchGoodsSearchHeader(`text=${value.trim()}`));
    }
  };
  const selectGoodsDebounced = useCallback(debounce(selectGoods, 1500), []);

  const dataSearchHeader = useSelector(goodsSelectors.getItemsSearchHeader);
  const loadStatus = useSelector(goodsSelectors.getGoodsLoadStatus);

  let options = [];

  if (
    dataSearchHeader.length === 0 &&
    value &&
    loadStatus === LOAD_STATUSES.SUCCESS
  ) {
    options = [{ value: "Ничего не найдено, попробуйте изменить запрос" }];
  } else {
    options = dataSearchHeader.map((item) => {
      return { value: item.label, key: item.id };
    });
  }

  return (
    <Header className={css.headerStyle}>
      <Link to={LINKS.start}>
        <div className={css.logos} />
      </Link>
      <AutoComplete
        options={options}
        placeholder="введите название товара"
        style={{ width: 500, marginRight: "10px" }}
        allowClear
        onChange={(value) => selectGoodsDebounced(value)}
        onSelect={(_, option) =>
          setTimeout(() => {
            navigate(LINKS.product + "/" + option.key);
          }, 900)
        }
      />
      <div className={css.menuHeader}>
        <MenuOutlined />
        <div className={css.menu}>
          <Link to={LINKS.table}>
            <div className={css.menuItem}>
              <ShoppingOutlined />
              <span>Sorting</span>
            </div>
          </Link>
          <Link to={LINKS.cart}>
            <div className={css.menuItem}>
              <Badge count={amountCart}>
                <ShoppingCartOutlined />
              </Badge>
              <span>Cart</span>
            </div>
          </Link>
          <div className={css.menuItem} onClick={handlerChangeStatus}>
            <Avatar
              className={css.login}
              style={
                status
                  ? { backgroundColor: "#87d068" }
                  : { backgroundColor: "#ccc" }
              }
              icon={<UserOutlined />}
            />
            <span>Login</span>
          </div>
        </div>
      </div>
    </Header>
  );
};
