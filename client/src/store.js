import { createStore, combineReducers, applyMiddleware } from "redux";
import Thunk from "redux-thunk";
import Reducers from "./reducers";

const rootReducer = combineReducers(Reducers);
const middlewares = applyMiddleware(Thunk);
const store = createStore(rootReducer, middlewares);

export default store;
