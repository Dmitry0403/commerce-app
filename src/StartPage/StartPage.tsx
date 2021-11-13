import { Row, Col } from "antd";
import { SideMenu } from "../SideMenu";

export const StartPage: React.FC = () => {
  return (
    <Row>
      <Col span={18} push={6} />

      <Col span={6} pull={18}>
        <SideMenu />
      </Col>
    </Row>
  );
};
