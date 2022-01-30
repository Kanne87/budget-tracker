import { ADD_LABEL, GET_LABELS, DELETE_LABEL, EDIT_LABEL } from "../actions/types";

const initialState = {
  labels: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LABELS:
      return {
        ...state,
        labels: action.payload,
        loading: false,
      };
    case DELETE_LABEL:
      return {
        ...state,
        labels: state.labels.filter((label) => label._id !== action.payload),
      };
    case ADD_LABEL:
      return {
        ...state,
        labels: [action.payload, ...state.labels],
      };
    case EDIT_LABEL:
      const index = state.labels.findIndex(
        (label) => label._id === action.payload._id
      );
      if (index > -1) {
        return {
          ...state,
          labels: [
            ...state.labels.slice(0, index),
            action.payload,
            ...state.labels.slice(index + 1),
          ],
        };
      }
    default:
      return state;
  }
}
