import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import { SideMenu } from "../SideMenu";
import css from "./styles.module.css";
import { popGoodsAction, takePopGoods } from "../../store/popularGoodsReducer";
import { CategoryList } from "../CategoryList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const StartPage: React.FC = () => {
  const popGoods = useSelector(takePopGoods);
  const dispatch = useDispatch();
  const fetchPopGoods = popGoodsAction.fetchPopGoods;

  useEffect(() => {
    dispatch(fetchPopGoods());
  }, [dispatch, fetchPopGoods]);

  return (
    <div>
      <Link to="/">
        <Row className={css.menuBox}>
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18} className={css.banner}></Col>
        </Row>
        <Row>
          {popGoods.map((item) => (
            <CategoryList
              category={item.category}
              items={item.items}
              key={item.category.id}
            />
          ))}
        </Row>
      </Link>
    </div>
  );
};
