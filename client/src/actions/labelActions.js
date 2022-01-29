import axios from "axios";
import {
  GET_LABELS,
  ADD_LABEL,
  EDIT_BUDGET,
  DELETE_BUDGET,
  BUDGETS_LOADING,
  SWITCH_PAGE,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getLabels = (userId) => (dispatch) => {
  axios
    .get(`/api/labels/${userId}`)
    .then((res) => {
      dispatch({
        type: GET_LABELS,
        payload: res.data,
      });
    })
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

export const editBudget = (budget) => (dispatch, getState) => {
  axios
    .put(`/api/budgets/${budget._id}`, budget, tokenConfig(getState))

    .then((res) =>
      dispatch({
        type: EDIT_BUDGET,
        payload: budget,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addLabel = (label) => (dispatch, getState) => {
  axios
    .post("/api/labels", label, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_LABEL,
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
