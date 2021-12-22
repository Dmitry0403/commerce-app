import css from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { GoodsCard } from "../GoodsCard";
import { sideMenuSelectors } from "../../store/categoriesReducer";
import { goodsSelectors, goodsAction } from "../../store/goodsReducer";
import { Loader } from "../Loader";
import { LOAD_STATUSES } from "../../store/constatns";
import { LINKS } from "../App";

export const CategoryPage: React.FC = () => {
  const { typeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!typeId) {
      return;
    }

    const categoryParams = "ids=" + typeId;
    const goodsParams = "categoryTypeIds=" + typeId;

    dispatch(goodsAction.fetchCategoryGoods(categoryParams, goodsParams));
  }, [dispatch, typeId]);

  const dataCategory = useSelector(sideMenuSelectors.getSideMenuItems);
  const dataGoods = useSelector(goodsSelectors.getGoodsItems);
  const pageStatus = useSelector(goodsSelectors.getGoodsLoadStatus);

  if (!dataCategory || !dataGoods) {
    return (
      <div className={css.error}>
        СТРАНИЦА НЕ НАЙДЕНА,
        <span onClick={() => navigate(-1)}>ВЕРНУТЬСЯ НАЗАД</span>
      </div>
    );
  } else
    return (
      <div>
        {pageStatus === LOAD_STATUSES.LOADING && <Loader />}
        {pageStatus === LOAD_STATUSES.SUCCESS && (
          <div className={css.categoryList}>
            <div className={css.title}>{dataCategory[0].label}</div>
            <div className={css.goodsList}>
              {dataGoods.map((item) => (
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
        {pageStatus === LOAD_STATUSES.FAILURE && (
          <div className={css.error}>Ошибка, попробуйте позже</div>
        )}
      </div>
    );
};
