import css from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { dataPageActions } from "../../store/dataPageReducer";
import { PARAMS_ACTION } from "../../store/dataPageReducer";
import { takeDataCategoryPage } from "../../store/popularGoodsReducer/selectors";
import { Link, useParams } from "react-router-dom";
import { GoodsCard } from "../GoodsCard";
import { CategoryListType } from "../CategoryList";
import { createBrowserHistory } from "history";

export const CategoryPage: React.FC = () => {
  const { type } = useParams();
  const dispatch = useDispatch();

  let getCategoryParams = {
    type: PARAMS_ACTION.GET_CATEGORY_PARAMS,
    payload: "unknown",
  };

  if (type) {
    getCategoryParams = dataPageActions.getCategoryParams(type);
  }

  useEffect(() => {
    dispatch(getCategoryParams);
  }, [dispatch, getCategoryParams]);

  const dataCategoryPage = useSelector(takeDataCategoryPage);

  let data: CategoryListType = {
    category: {
      id: 0,
      label: "СТРАНИЦА НЕ НАЙДЕНА",
      type: "",
    },
    items: [],
  };
  if (dataCategoryPage) {
    data = dataCategoryPage;
  }
  if (data.category.label === "СТРАНИЦА НЕ НАЙДЕНА") {
    const history = createBrowserHistory();
    return (
      <div className={css.error}>
        СТРАНИЦА НЕ НАЙДЕНА,
        <span onClick={() => history.back()}>ВЕРНУТЬСЯ НАЗАД</span>
      </div>
    );
  } else
    return (
      <div className={css.categoryList}>
        <div className={css.title}>{data.category.label}</div>
        <div className={css.goodsList}>
          {data.items.map((item) => (
            <Link to={`/${item.category_type}/${item.id}`}>
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
