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
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import css from "./styles.module.css";
import { useCallback, useEffect, useState } from "react";
import { cartActions, getCartSlice } from "../../store/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import { LINKS } from "../App";
import { goodsAction, getGoodsSlice } from "../../store/goodsReducer";
import { LOAD_STATUSES } from "../../store/constatns";
import { getUserSlice, userActions } from "../../store/userReducer";

export const Header = () => {
  const { Header } = Layout;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(getUserSlice).isAuth;
  const token = useSelector(getUserSlice).user.token;
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(cartActions.fetchCart(token));
  }, [dispatch, token]);

  const cart = useSelector(getCartSlice).cart;
  let amountCart: number;
  amountCart = cart ? cart.length : 0;

  const btn = (
    <Button
      type="primary"
      onClick={() => {
        dispatch(userActions.setUserExit());
        localStorage.removeItem("userToken");
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

  const dataSearchHeader = useSelector(getGoodsSlice).itemsSearchHeader;
  const loadStatus = useSelector(getGoodsSlice).loadStatus;

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
        style={{ width: 500 }}
        allowClear
        onChange={(value) => selectGoodsDebounced(value)}
        onSelect={(_, option) =>
          setTimeout(() => {
            navigate(LINKS.product + "/" + option.key);
          }, 900)
        }
      />
      <Link to={LINKS.table}>
        {" "}
        <ShoppingOutlined />
      </Link>
      <Link to={LINKS.cart}>
        <Badge count={amountCart}>
          <ShoppingCartOutlined />
        </Badge>
      </Link>

      <Button
        style={{ border: "none", borderRadius: "50%" }}
        onClick={handlerChangeStatus}
      >
        <Avatar
          style={
            status
              ? { backgroundColor: "#87d068" }
              : { backgroundColor: "#ccc" }
          }
          icon={<UserOutlined />}
        />
      </Button>
    </Header>
  );
};
