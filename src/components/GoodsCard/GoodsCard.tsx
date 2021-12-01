import { Card } from "antd";
import classNames from "classnames";
import css from "./styles.module.css";
import { GoodsCardType } from "../../store/goodsReducer";



export const GoodsCard: React.FC<GoodsCardType> = (props) => {
  const { label, img, price} = props;
  const classCard = classNames(css.card, { backgroundImage: `url (${img})` });
  return (
    <div className={css.mainCard}>
      <Card className={classCard}>
        <p className={css.title}>{label}</p>
        <p>{price + " руб."}</p>
      </Card>
    </div>
  );
};
