import {
   GET_MATCHES,
   ADD_MATCH,
   DELETE_MATCH,
 } from "../actions/types";

 
 const initialState = {
   matches: [], 
   loading: false,
 };
 
 export default function (state = initialState, action) {
   switch (action.type) {
     case GET_MATCHES:
       return {
         ...state,
         matches: action.payload,
         loading: false,
       };
       case ADD_MATCH:
         return {
           ...state,
           matches: [action.payload, ...state.matches],
         };
         case DELETE_MATCH:
           return {
             ...state,
             matches: state.matches.filter((match) => match._id !== action.payload),
           };
     default:
       return state;
   }
 }
 