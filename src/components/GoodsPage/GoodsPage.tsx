import css from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { dataPageActions } from "../../store/paramsPageReducer";
import { getDataGoodsPage } from "../../store/popularGoodsReducer/selectors";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { getCart } from "../../store/cartReducer/selectors";
import { cartActions } from "../../store/cartReducer";

export enum BUTTON_STATUS {
  putInCart = "Положить в корзину",
  delFromCart = "Удалить из корзины"
}

export const GoodsPage: React.FC = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!type || !id) {
      return;
    }

    const params = {
      type,
      id,
    };

    const getGoodsParams = dataPageActions.setGoodsParams(params);

    dispatch(getGoodsParams);
  }, [dispatch, type, id]);

  const dataGoodsPage = useSelector(getDataGoodsPage);
  const cart = useSelector(getCart);
  let buttonStatus = BUTTON_STATUS.putInCart;

  if (
    cart.find(
      (item) =>
        item.category === dataGoodsPage?.category_type &&
        item.id === dataGoodsPage.id
    )
  ) {
    buttonStatus = BUTTON_STATUS.delFromCart;
  }

  if (!dataGoodsPage) {
    return (
      <div className={css.error}>
        ТОВАР НЕ НАЙДЕН,
        <span onClick={() => navigate(-1)}>ВЕРНУТЬСЯ НАЗАД </span>
      </div>
    );
  } else
    return (
      <div className={css.page}>
        <div className={css.image}>
          <img src={dataGoodsPage.img} alt={dataGoodsPage.label} />
        </div>
        <div className={css.subject}>
          <div className={css.label}>{dataGoodsPage.label}</div>
          <div className={css.content}>{dataGoodsPage.content}</div>
          <div className={css.price}>{dataGoodsPage.price} руб.</div>
          <Button
            className={css.button}
            onClick={() =>
              dispatch(cartActions.changeCart(dataGoodsPage, buttonStatus))
            }
          >
            {buttonStatus}
          </Button>
        </div>
      </div>
    );
};
