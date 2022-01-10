import css from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GoodsCard } from "../GoodsCard";
import { cartActions, cartSelectors } from "../../store/cartReducer";
import { LINKS } from "../App";
import { LOAD_STATUSES } from "../../store/constatns";
import { userSelectors } from "../../store/userReducer";
import { useEffect } from "react";

export const CartPage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cartActions.fetchCart());
  }, [dispatch]);

  const dataCart = useSelector(cartSelectors.getCart);
  const loadStatus = useSelector(cartSelectors.getCartLoadStatus);
  const errorMessage = useSelector(userSelectors.getErrorMessage);
  const navigate = useNavigate();

  let titleCart: string = "Ваша корзина покупок";
  if (dataCart.length === 0) {
    titleCart = "Ваша корзина покупок пуста";
  }
  return (
    <div>
      {loadStatus === LOAD_STATUSES.SUCCESS && (
        <div className={css.categoryList}>
          <div className={css.title}>{titleCart}</div>
          <div className={css.goodsList}>
            {dataCart.map((item) => (
              <Link to={LINKS.product + "/" + item.id} key={item.id}>
                <GoodsCard
                  label={item.label}
                  img={item.img}
                  price={item.price}
                  id={item.id}
                  categoryTypeId={item.categoryTypeId}
                />
              </Link>
            ))}
          </div>
        </div>
      )}
      {loadStatus === LOAD_STATUSES.FAILURE && (
        <div className={css.errorPage}>
          {errorMessage},
          <span onClick={() => navigate(-1)}>вернуться назад </span>
        </div>
      )}
    </div>
  );
};
