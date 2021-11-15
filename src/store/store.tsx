import { createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { categoriesReducer } from "./categoriesReducer";
import { popGoodsReducer } from "./popularGoodsReducer";


const reducer = combineReducers({
  categoryItems: categoriesReducer,
  popGoodsList: popGoodsReducer
})


export const store = createStore(reducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>



