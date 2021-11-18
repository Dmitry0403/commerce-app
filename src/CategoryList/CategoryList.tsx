import { GoodsCard } from "../GoodCard";
import { GoodsCardType } from "../GoodCard";
import { CategoryType } from "../store/categoriesReducer";
import { Link } from "react-router-dom";
import css from "./styles.module.css";

export interface CategoryListType {
  category: CategoryType;
  items: GoodsCardType[];
}

export const CategoryList = (props: CategoryListType) => {
  const { category, items } = props;
  return (
    <div className={css.categoryList}>
      <Link to="./">
      <div className={css.title}>{category.label}</div>
      </Link>
      <div className={css.goodsList}>
        {items.map((item) => (
          <Link to={item.category_type}>
            <GoodsCard
              key={item.id}
              label={item.label}
              img={item.img}
              price={item.price}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
