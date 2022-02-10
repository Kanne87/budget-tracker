import axios from "axios";
import {
  GET_MATCHES,
  ADD_MATCH,
  EDIT_LABEL,
  DELETE_MATCH,
  BUDGETS_LOADING,
  SWITCH_PAGE,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getMatches = (userId) => (dispatch) => {
  axios
    .get(`/api/matches/${userId}`)
    .then((res) => {
      dispatch({
        type: GET_MATCHES,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addMatch = (match) => (dispatch, getState) => {
   axios
     .post("/api/matches", match, tokenConfig(getState))
     .then((res) =>
       dispatch({
         type: ADD_MATCH,
         payload: res.data,
       })
     )
     .catch((err) =>
       dispatch(returnErrors(err.response.data, err.response.status))
     );
 };

 export const deleteMatch = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/matches/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_MATCH,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

/* 

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

} */

