import { CHANGE_PAGE } from "../actions/types";

const initialState = {
  page: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_PAGE:
      return {
        ...state,
        page: "1",
      };
    default:
      return state;
  }
}
