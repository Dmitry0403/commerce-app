import css from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { dataPageActions } from "../../store/dataPageReducer";
import { takeDataGoodsPage } from "../../store/popularGoodsReducer/selectors";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "antd";

export const GoodsPage: React.FC = () => {
  const { category_type, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!category_type || !id) {
      return;
    }

    const params = {
      category_type,
      id,
    };

    const getGoodsParams = dataPageActions.getGoodsParams(params);

    dispatch(getGoodsParams);
  }, [dispatch, category_type, id]);

  const dataGoodsPage = useSelector(takeDataGoodsPage);

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
          <img src={dataGoodsPage.img} alt={dataGoodsPage.label}/>
        </div>
        <div className={css.subject}>
          <div className={css.label}>{dataGoodsPage.label}</div>
          <div className={css.content}>{dataGoodsPage.content}</div>
          <div className={css.price}>{dataGoodsPage.price} руб.</div>
          <Button className={css.button}>Положить в корзину</Button>
        </div>
      </div>
    );
};
