import React from "react";
import { GoodsCard } from "../GoodsCard";
import { GoodsCardType } from "../GoodsCard";
import { CategoryType } from "../../store/categoriesReducer";
import { Link } from "react-router-dom";
import css from "./styles.module.css";

export interface CategoryListType {
  category: CategoryType;
  items: GoodsCardType[];
}

export const CategoryList: React.FC<CategoryListType> = (props) => {
  const { category, items } = props;
  return (
    <div className={css.categoryList}>
      <Link to={`/${category.type}`}>
        <div className={css.title}>{category.label}</div>
      </Link>
      <div className={css.goodsList}>
        {items.map((item) => (
          <Link to={`/${item.categoryTypeId}/${item.id}`} key={item.id}>
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
