import { createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { sideMenuReducer } from "./sideMenuReducer";


const reducer = combineReducers({
  sideMenuItems: sideMenuReducer
})


export const store = createStore(reducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>



