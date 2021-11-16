import { Row, Col } from "antd";
import { Route, Switch } from "react-router-dom";
import { SideMenu } from "../SideMenu";
import css from "./styles.module.css";
import { popGoodsAction, getPopGoods } from "../store/popularGoodsReducer";
import { CategoryList } from "../CategoryList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const StartPage: React.FC = () => {
  const popGoods = useSelector(getPopGoods);
  const dispatch = useDispatch();
  const fetchPopGoods = popGoodsAction.fetchPopGoods;

  useEffect(() => {
    dispatch(fetchPopGoods());
  }, [dispatch, fetchPopGoods]);

  return (
    <Switch>
      <Route path="/">
        <Row className={css.menuBox} justify={"center"}>
          <Col span={6}>
            <SideMenu />
          </Col>
          <Col span={18} className={css.banner}></Col>
        </Row>
        <Row justify={"center"}>
          {popGoods.map((item) => (
            <CategoryList category={item.category} items={item.items} />
          ))}
        </Row>
      </Route>
    </Switch>
  );
};
