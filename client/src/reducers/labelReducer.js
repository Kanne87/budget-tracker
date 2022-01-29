import {
   ADD_LABEL,
   GET_LABELS,
 } from "../actions/types";
 
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
     case ADD_LABEL:
       return {
         ...state,
         labels: [action.payload, ...state.labels],
       };
     default:
       return state;
   }
 }
 