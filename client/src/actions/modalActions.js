import { SET_MATCH_MODAL, UNSET_MATCH_MODAL, SET_BUDGET_MODAL, UNSET_BUDGET_MODAL } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const setMatchModal = (modal) => {
  return {
    type: SET_MATCH_MODAL,
    payload: modal,
  }
};

export const unsetMatchModal = () => {
   return {
      type: UNSET_MATCH_MODAL,
    }
};

export const setBudgetModal = (modal) => {
   return {
     type: SET_BUDGET_MODAL,
     payload: modal,
   }
 };
 
 export const unsetBudgetModal = () => {
    return {
       type: UNSET_BUDGET_MODAL,
     }
 };

