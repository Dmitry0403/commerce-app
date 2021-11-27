import { createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import { categoriesReducer } from "./categoriesReducer";
import { popGoodsReducer } from "./popularGoodsReducer";
import { paramsPageReducer } from "./paramsPageReducer";
import { cartReducer } from "./cartReducer";


const reducer = combineReducers({
  categoryItems: categoriesReducer,
  popGoodsList: popGoodsReducer,
  paramsPage: paramsPageReducer,
  cartData: cartReducer
})


export const store = createStore(reducer, compose( applyMiddleware(thunk),
// @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
));

export type RootState = ReturnType<typeof store.getState>



