import { Card } from "antd";
import classNames from "classnames";
import css from "./styles.module.css";

export interface GoodsCardType {
  id?: number;
  category_type?: string;
  label: string;
  price: number;
  img: string;
}

export const GoodsCard = (props: GoodsCardType) => {
  const { label, img, price } = props;
  const classCard = classNames(css.card, { backgroundImage: `url (${img})` });
  const classTitle = { color: "white", fontSize: "25px" };
  return (
    <Card title={label} className={classCard} headStyle={classTitle}>
      {price + " руб."}
    </Card>
  );
};
