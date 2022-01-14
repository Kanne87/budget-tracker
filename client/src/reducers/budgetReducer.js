import {
  GET_BUDGETS,
  ADD_BUDGET,
  DELETE_BUDGET,
  BUDGETS_LOADING,
  EDIT_BUDGET,
  SWITCH_PAGE
} from "../actions/types";
import pages from "../pages/pages";

const initialState = {
  budgets: [],
  loading: false,
  edit: true,
  page: 1
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BUDGETS:
      return {
        ...state,
        budgets: action.payload,
        loading: false,
      };
    case DELETE_BUDGET:
      return {
        ...state,
        budgets: state.budgets.filter(
          (budget) => budget._id !== action.payload
        ),
      };
    case ADD_BUDGET:
      return {
        ...state,
        budgets: [action.payload, ...state.budgets],
      };

    case EDIT_BUDGET:
      return {
        ...state,
        budgets: state.budgets.filter(
          (budget) => budget._id !== action.payload
        ),
      };
    case BUDGETS_LOADING:
      return {
        ...state,
        loading: true,
      };
      case SWITCH_PAGE:
      return {
        ...state,
        page: pages(action.payload),
      };
    default:
      return state;
  }
}
