import axios from "axios";
import {
  GET_BUDGETS,
  ADD_BUDGET,
  EDIT_BUDGET,
  DELETE_BUDGET,
  BUDGETS_LOADING,
  SWITCH_PAGE,
} from "./types";
import pages from "../pages/pages";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getBudgets = () => (dispatch) => {
  dispatch(setBudgetsLoading());
  axios
    .get("/api/budgets")
    .then((res) =>
      dispatch({
        type: GET_BUDGETS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteBudget = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/budgets/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_BUDGET,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
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

export const addBudget = (budget) => (dispatch, getState) => {
  axios
    .post("/api/budgets", budget, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_BUDGET,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setBudgetsLoading = () => {
  return {
    type: BUDGETS_LOADING,
  };
};

export const switchPage = (page) => {
  return {
    type: SWITCH_PAGE,
    payload: page,
  };
};
