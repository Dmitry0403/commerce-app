import { createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import { categoriesReducer } from "./categoriesReducer";
import { popGoodsReducer } from "./popularGoodsReducer";
import { cartReducer } from "./cartReducer";
import { goodsReducer } from "./goodsReducer";


const reducer = combineReducers({
  categoryItems: categoriesReducer,
  popGoodsList: popGoodsReducer,
  cartData: cartReducer,
  goodsData: goodsReducer
})


export const store = createStore(reducer, compose( applyMiddleware(thunk),
// @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
));

export type RootState = ReturnType<typeof store.getState>



