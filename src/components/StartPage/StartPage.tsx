import { Row, Col } from "antd";
import { SideMenu } from "../SideMenu";
import css from "./styles.module.css";
import {
  popGoodsAction,
  popGoodsSelectors,
} from "../../store/popularGoodsReducer";
import { CategoryList } from "../CategoryList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LOAD_STATUSES } from "../../store/constatns";
import { Loader } from "../Loader";

export const StartPage: React.FC = () => {
  const popGoods = useSelector(popGoodsSelectors.getPopGoods);
  const popGoodsLoadStatus = useSelector(
    popGoodsSelectors.getPopGoodsLoadStatus
  );
  const dispatch = useDispatch();
  const fetchPopGoods = popGoodsAction.fetchPopGoods;

  useEffect(() => {
    dispatch(fetchPopGoods());
  }, [dispatch, fetchPopGoods]);

  return (
    <div>
      <Row className={css.menuBox}>
        <Col span={6}>
          <SideMenu />
        </Col>
        <Col span={18} className={css.banner}></Col>
      </Row>
      <Row>
        {popGoodsLoadStatus === LOAD_STATUSES.LOADING && <Loader />}
        {popGoodsLoadStatus === LOAD_STATUSES.SUCCESS &&
          popGoods.map((item) => (
            <CategoryList
              category={item.category}
              items={item.items}
              key={item.category.id}
            />
          ))}
        {popGoodsLoadStatus === LOAD_STATUSES.FAILURE && (
          <div className={css.error}>Ошибка, попробуйте позже</div>
        )}
      </Row>
    </div>
  );
};
