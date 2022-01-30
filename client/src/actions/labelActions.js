import axios from "axios";
import {
  GET_LABELS,
  ADD_LABEL,
  EDIT_LABEL,
  DELETE_LABEL,
  BUDGETS_LOADING,
  SWITCH_PAGE,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { colors } from "./constants";

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

export const deleteLabel = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/labels/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_LABEL,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const editLabel = (label) => (dispatch, getState) => {
  axios
    .put(`/api/labels/${label._id}`, label, tokenConfig(getState))

    .then((res) =>
      dispatch({
        type: EDIT_LABEL,
        payload: label,
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

export const getLabelColor = (labelId, labels ) => {
  const result = labels.find(label => label._id === labelId);
  if (result === undefined) {
    return ""
  } else {
    const hex = colors.find(color => color.id === result.label_color);
    return "#" + hex.hex;
  }

}

