import css from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { getCart, getCartLoadStatus } from "../../store/cartReducer/selectors";
import { cartActions } from "../../store/cartReducer";
import { getGoodsSlice, goodsAction } from "../../store/goodsReducer";
import { LOAD_STATUSES } from "../../store/constatns";
import { Loader } from "../Loader";

export enum BUTTON_STATUS {
  putInCart = "Положить в корзину",
  delFromCart = "Удалить из корзины",
}

export const GoodsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) {
      return;
    }

    const params = "ids=" + id;

    dispatch(goodsAction.fetchGoods(params));
  }, [dispatch, id]);

  const dataGoodsPage = useSelector(getGoodsSlice).items[0];
  const pageStatus = useSelector(getGoodsSlice).loadStatus;
  const cart = useSelector(getCart);
  let buttonStatus = BUTTON_STATUS.putInCart;
  const cartLoadStatus = useSelector(getCartLoadStatus);

  if (cart.find((item) => item.id === dataGoodsPage.id)) {
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
      <div>
        {pageStatus === LOAD_STATUSES.LOADING && <Loader />}
        {pageStatus === LOAD_STATUSES.SUCCESS && (
          <div className={css.page}>
            <div className={css.image}>
              <img src={dataGoodsPage.img} alt={dataGoodsPage.label} />
            </div>
            <div className={css.subject}>
              <div className={css.label}>{dataGoodsPage.label}</div>
              <div className={css.content}>{dataGoodsPage.description}</div>
              <div className={css.price}>{dataGoodsPage.price} руб.</div>
              <Button
                disabled={cartLoadStatus === LOAD_STATUSES.LOADING}
                className={css.button}
                onClick={() => {
                  dispatch(cartActions.changeCart(dataGoodsPage, buttonStatus));
                }}
              >
                {buttonStatus}
              </Button>
            </div>
          </div>
        )}
        {pageStatus === LOAD_STATUSES.FAILURE && (
          <div className={css.error}>Ошибка, попробуйте позже</div>
        )}
      </div>
    );
};
