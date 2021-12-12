import { Layout, Badge, AutoComplete } from "antd";
import { debounce } from "lodash";
import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import css from "./styles.module.css";
import { useEffect, useState } from "react";
import { cartActions, getCart } from "../../store/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import { LINKS } from "../App";
import {
  goodsAction,
  getGoodsSearchHeader,
  getGoodsLoadStatus,
} from "../../store/goodsReducer";
import { LOAD_STATUSES } from "../../store/constatns";

export const Header: React.FC = () => {
  const { Header } = Layout;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  useEffect(() => {
    dispatch(cartActions.fetchCart());
  }, [dispatch]);

  const cart = useSelector(getCart);
  const amountCart = cart.length;

  const selectGoods = (value: string) => {
    setValue(value);
    if (value) {
      dispatch(goodsAction.fetchGoodsSearchHeader(`text=${value.trim()}`));
    }
  };
  const selectGoodsDebounced = debounce(selectGoods, 1500);

  const dataSearchHeader = useSelector(getGoodsSearchHeader);
  const loadStatus = useSelector(getGoodsLoadStatus);

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
        allowClear={true}
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
    </Header>
  );
};
