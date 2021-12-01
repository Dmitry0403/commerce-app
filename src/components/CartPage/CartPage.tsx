import css from "./styles.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GoodsCard } from "../GoodsCard";
import { getCart } from "../../store/cartReducer";

export const CartPage: React.FC = () => {
  const dataCart = useSelector(getCart);
  let titleCart: string = "Ваша корзина покупок";
  if (dataCart.length === 0) {
    titleCart = "Ваша корзина покупок пуста";
  }
  return (
    <div className={css.categoryList}>
      <div className={css.title}>{titleCart}</div>
      <div className={css.goodsList}>
        {dataCart.map((item) => (
          <Link to={`/product/${item.id}`} key={item.id}>
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
  );
};
