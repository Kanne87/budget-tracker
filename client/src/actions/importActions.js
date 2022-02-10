import {
  IMPORT_ITEMS,
  IMPORT_LOADING,
  UPLOAD_LOADING,
  ADD_DEBITS,
  GET_DEBITS,
  EDIT_DEBIT,
  UPDATE_DEBIT,
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const importItems = (data) => (dispatch) => {
  dispatch({ type: IMPORT_LOADING });
  const csvFile = data;
  const csvArray = [];
  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    processCSV(text);
  };
  reader.readAsText(csvFile);
  const processCSV = (str, delim = ";") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    const headersSub = headers.map((header) =>
      header.substr(1, header.length - 2)
    );
    console.log(headersSub);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    const newArray = rows.map((row) => {
      const values = row.split(delim);
      const valuesSub = values.map((value) =>
        value.substr(1, value.length - 2)
      );

      const eachObject = headersSub.reduce((obj, header, i) => {
        obj[header] = valuesSub[i];
        return obj;
      }, {});
      return eachObject;
    });
    dispatch({ type: IMPORT_ITEMS, payload: newArray });
  };
};

export const postDebits = (debits) => (dispatch, getState) => {
  debits.map(debit => {
    axios
      .post("/api/debits", debit, tokenConfig(getState))
      .then((res) =>
        dispatch({
          type: ADD_DEBITS,
          payload: res.data,
        })
      )
      .catch((err) =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
    })
};

export const getDebits = (user_id) => (dispatch) => {
  dispatch(setDebitsLoading());
  axios
    .get(`/api/debits/${user_id}`)
    .then((res) => {
      dispatch({
        type: GET_DEBITS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
}
export const editDebit = (debit) => (dispatch, getState) => {
  axios
    .put(`/api/debits/${debit._id}`, debit, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: EDIT_DEBIT,
        payload: debit,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
}


export const setDebitsLoading = () => {
  return {
    type: UPLOAD_LOADING
  };
}