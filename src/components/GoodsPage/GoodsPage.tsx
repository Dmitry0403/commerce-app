import css from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { dataPageActions } from "../../store/dataPageReducer";
import { PARAMS_ACTION } from "../../store/dataPageReducer";
import { takeDataGoodsPage } from "../../store/popularGoodsReducer/selectors";
import { useParams } from "react-router-dom";
import { GoodsCardType } from "../GoodsCard";
import { createBrowserHistory } from "history";
import { Button } from "antd";

export const GoodsPage: React.FC = () => {
  const { type, id } = useParams();
  const dispatch = useDispatch();

  let getGoodsParams = {
    type: PARAMS_ACTION.GET_GOODS_PARAMS,
    params: { category_type: "unkouwn", id: "0" },
  };

  if (type && id) {
    const params = {
      category_type: type,
      id,
    };
    getGoodsParams = dataPageActions.getGoodsParams(params);
  }

  useEffect(() => {
    dispatch(getGoodsParams);
  }, [dispatch, getGoodsParams]);

  const dataGoodsPage = useSelector(takeDataGoodsPage);

  let data: GoodsCardType = {
    id: 0,
    category_type: "unknown",
    label: "ТОВАР НЕ НАЙДЕН",
    price: 0,
    img: "unknown",
    content: "unknown",
  };
  if (dataGoodsPage) {
    data = dataGoodsPage;
  }
  if (data.label === "ТОВАР НЕ НАЙДЕН") {
    const history = createBrowserHistory();
    return (
      <div className={css.error}>
        ТОВАР НЕ НАЙДЕН,
        <span onClick={() => history.back()}>ВЕРНУТЬСЯ НАЗАД </span>
      </div>
    );
  } else
    return (
      <div className={css.page}>
        <div className={css.image}>
          <img src={data.img} />
        </div>
        <div className={css.subject}>
          <div className={css.label}>{data.label}</div>
          <div className={css.content}>{data.content}</div>
          <div className={css.price}>{data.price} руб.</div>
          <Button className={css.button}>Положить в корзину</Button>
        </div>
      </div>
    );
};
