import css from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { dataPageActions } from "../../store/dataPageReducer";
import { getDataCategoryPage } from "../../store/popularGoodsReducer/selectors";
import { Link, useParams, useNavigate } from "react-router-dom";
import { GoodsCard } from "../GoodsCard";

export const CategoryPage: React.FC = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!type) {
      return;
    }
    const setCategoryParams = dataPageActions.setCategoryParams(type);
    dispatch(setCategoryParams);
  }, [dispatch, type]);

  const dataCategoryPage = useSelector(getDataCategoryPage);

  if (!dataCategoryPage) {
    return (
      <div className={css.error}>
        СТРАНИЦА НЕ НАЙДЕНА,
        <span onClick={() => navigate(-1)}>ВЕРНУТЬСЯ НАЗАД</span>
      </div>
    );
  } else
    return (
      <div className={css.categoryList}>
        <div className={css.title}>{dataCategoryPage.category.label}</div>
        <div className={css.goodsList}>
          {dataCategoryPage.items.map((item) => (
            <Link to={`/${item.category_type}/${item.id}`} key={item.id}>
              <GoodsCard label={item.label} img={item.img} price={item.price} />
            </Link>
          ))}
        </div>
      </div>
    );
};
