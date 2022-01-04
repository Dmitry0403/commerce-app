import { createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import { categoriesReducer } from "./categoriesReducer";
import { popGoodsReducer } from "./popularGoodsReducer";
import { cartReducer } from "./cartReducer";
import { goodsReducer } from "./goodsReducer";
import { userReducer } from "./userReducer";
import { Api } from "../api";

const api = new Api()

const reducer = combineReducers({
  categoryItems: categoriesReducer,
  popGoodsList: popGoodsReducer,
  cartData: cartReducer,
  goodsData: goodsReducer,
  userData: userReducer,
})


export const store = createStore(reducer, compose( applyMiddleware(thunk.withExtraArgument(api)),
// @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
));

export type RootState = ReturnType<typeof store.getState>


