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
import { cartActions, getCart } from "../../store/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import { LINKS } from "../App";
import { goodsAction, getGoodsSlice } from "../../store/goodsReducer";
import { LOAD_STATUSES } from "../../store/constatns";

interface StatusType {
  status: boolean;
  changeLoginStatus: () => void;
}

export const Header: React.FC<StatusType> = ({ status, changeLoginStatus }) => {
  const { Header } = Layout;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(cartActions.fetchCart());
  }, [dispatch]);

  const cart = useSelector(getCart);
  const amountCart = cart.length;

  const btn = (
    <Button
      type="primary"
      onClick={() => {
        changeLoginStatus();
        notification.close("close");
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
