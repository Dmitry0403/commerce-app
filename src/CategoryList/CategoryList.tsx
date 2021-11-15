import { GoodsCard } from "../GoodCard";
import { GoodsCardType } from "../GoodCard";
import { CategoryType } from "../store/categoriesReducer";
import css from "./styles.module.css"

export interface CategoryListType {
  category: CategoryType;
  items: GoodsCardType[];
}

export const CategoryList = (props: CategoryListType) => {
  const {category, items} = props;
  return (
    <div className={css.categoryList}>
      <div className={css.title}>{category.label}</div>
      <div className={css.goodsList} >
        {items.map((item) => (
          <GoodsCard
            key={item.id}
            label={item.label}
            img={item.img}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};
