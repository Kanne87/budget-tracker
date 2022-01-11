import { combineReducers } from "redux";
import budgetReducer from "./budgetReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  budget: budgetReducer,
  error: errorReducer,
  auth: authReducer
});
