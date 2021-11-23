import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./components/App";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import 'antd/dist/antd.css'


 
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
