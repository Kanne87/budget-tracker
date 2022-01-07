import axios from "axios";
import {
  GET_BUDGETS,
  ADD_BUDGET,
  EDIT_BUDGET,
  DELETE_BUDGET,
  BUDGETS_LOADING,
} from "./types";

export const getBudgets = () => (dispatch) => {
  dispatch(setBudgetsLoading());
  axios.get("/api/budgets").then((res) =>
    dispatch({
      type: GET_BUDGETS,
      payload: res.data,
    })
  );
};

export const deleteBudget = (id) => (dispatch) => {
  axios.delete(`/api/budgets/${id}`).then((res) =>
    dispatch({
      type: DELETE_BUDGET,
      payload: id,
    })
  );
};

export const editBudget = (id) => (dispatch) => {
  axios.put(`/api/budgets/${id}`).then((res) =>
    dispatch({
      type: EDIT_BUDGET,
      payload: id,
    })
  );
};

export const addBudget = (budget) => (dispatch) => {
  axios.post("/api/budgets", budget).then((res) =>
    dispatch({
      type: ADD_BUDGET,
      payload: res.data,
    })
  );
};

export const setBudgetsLoading = () => {
  return {
    type: BUDGETS_LOADING,
  };
};
