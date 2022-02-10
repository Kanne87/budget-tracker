import { SHOW_MATCH_MODAL, HIDE_MATCH_MODAL, SHOW_BUDGET_MODAL, HIDE_BUDGET_MODAL, SHOW_BUDGET_DEBIT_MODAL, HIDE_BUDGET_DEBIT_MODAL } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const showMatchModal = () => {
  return {
    type: SHOW_MATCH_MODAL,
  }
};

export const hideMatchModal = () => {
   return {
      type: HIDE_MATCH_MODAL,
    }
};

export const showBudgetModal = (budgetId) => {
   return {
     type: SHOW_BUDGET_MODAL,
     payload: budgetId !== null && budgetId,
   }
 };
 
 export const hideBudgetModal = () => {
    return {
       type: HIDE_BUDGET_MODAL,
     }
 };

 export const showBudgetDebitModal = ({target: {id: debitId}}) => {
   return {
     type: SHOW_BUDGET_DEBIT_MODAL,
     payload: debitId !== null && debitId,
   }
 };
 
 export const hideBudgetDebitModal = () => {
    return {
       type: HIDE_BUDGET_DEBIT_MODAL,
     }
 };

