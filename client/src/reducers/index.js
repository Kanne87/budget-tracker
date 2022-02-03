import { combineReducers } from "redux";
import budgetReducer from "./budgetReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import labelReducer from "./labelReducer";
import importReducer from "./importReducer";

export default combineReducers({
  budget: budgetReducer,
  label: labelReducer,
  error: errorReducer,
  auth: authReducer,
  import: importReducer,
});
