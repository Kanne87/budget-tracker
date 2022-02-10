import { SHOW_MATCH_MODAL, HIDE_MATCH_MODAL, SHOW_BUDGET_MODAL, HIDE_BUDGET_MODAL, SHOW_BUDGET_DEBIT_MODAL, HIDE_BUDGET_DEBIT_MODAL } from "../actions/types";

const initialState = {
  matchModal: false,
  budgetModal: false,
  budgetModalDebitId: null,
  budgetModalBudgetId: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_MATCH_MODAL:
      return {
        ...state,
        matchModal: true,
      };
      case HIDE_MATCH_MODAL:
      return {
        ...state,
        matchModal: false,
      };
      case SHOW_BUDGET_MODAL:
      return {
        ...state,
        budgetModal: true,
        budgetModalBudgetId: action.payload,
      };
      case HIDE_BUDGET_MODAL:
      return {
        ...state,
        budgetModal: false,
        budgetModalBudgetId: null,
      };
      case SHOW_BUDGET_DEBIT_MODAL:
      return {
        ...state,
        budgetModal: true,
        budgetModalDebitId: action.payload,
      };
      case HIDE_BUDGET_DEBIT_MODAL:
      return {
        ...state,
        budgetModal: false,
        budgetModalDebitId: null,
      };
    default:
      return state;
  }
}
