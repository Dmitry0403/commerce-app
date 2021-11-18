import "antd/dist/antd.css";
import { StartPage } from "../StartPage";
import { Switch, Route } from "react-router-dom";

export const App = () => {
  return (
    <Switch>
      <Route path="/">
        <StartPage />
      </Route>
    </Switch>
  );
};
