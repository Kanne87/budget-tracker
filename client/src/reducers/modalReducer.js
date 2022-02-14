import { SET_MATCH_MODAL, UNSET_MATCH_MODAL, SET_BUDGET_MODAL, UNSET_BUDGET_MODAL } from "../actions/types";

const initialState = {
  matchModal: false,
  matchModalId: null,
  matchModalBudgetId: null,
  budgetModalMode: null,
  budgetModalId: null,

};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_MATCH_MODAL:
      return {
        ...state,
        matchModal: true,
        matchModalId: action.payload.debit_id,
        matchModalBudgetId: action.payload.budget_id,
      };
      case UNSET_MATCH_MODAL:
      return {
        ...state,
        matchModal: false,
        matchModalId: null,
        matchModalBudgetId: null,
      };
      case SET_BUDGET_MODAL:
      return {
        ...state,
        budgetModalMode: action.payload.mode,
        budgetModalId: action.payload.id,
      };
      case UNSET_BUDGET_MODAL:
      return {
        ...state,
        budgetModalMode: null,
        budgetModalId: null,
      };
    default:
      return state;
  }
}
