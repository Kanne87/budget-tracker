import {
   IMPORT_ITEMS,
   IMPORT_LOADING,
   UPLOAD_LOADING,
   ADD_DEBITS,
   GET_DEBITS,
 } from "../actions/types";

 const initialState = {
   imports: [],
   debits: [],
   loading: false,
   uploading: false,
   isImported: false
   
 };
 
 export default function (state = initialState, action) {
   switch (action.type) {
     case IMPORT_ITEMS:
       return {
         ...state,
         imports: action.payload,
         loading: false,
         isImported: true,
         
       };
       case IMPORT_LOADING:
       return {
         ...state,
         loading: true,
       };
       case UPLOAD_LOADING:
       return {
         ...state,
         uploading: true,
       };
       case ADD_DEBITS:
       return {
         ...state,
         debits: [action.payload, ...state.debits],
       };
       case GET_DEBITS:
       return {
         ...state,
         debits: action.payload,
         loading: false,
       };
     default:
       return state;
   }
 }
 