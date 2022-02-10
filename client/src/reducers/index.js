import { combineReducers } from "redux";
import budgetReducer from "./budgetReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import labelReducer from "./labelReducer";
import importReducer from "./importReducer";
import matchReducer from "./matchReducer";
import modalReducer from "./modalReducer";

export default combineReducers({
  budget: budgetReducer,
  label: labelReducer,
  error: errorReducer,
  auth: authReducer,
  import: importReducer,
  match: matchReducer,
  modal: modalReducer,
});
