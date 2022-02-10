import {
   IMPORT_ITEMS,
   IMPORT_LOADING,
   UPLOAD_LOADING,
   ADD_DEBITS,
   GET_DEBITS,
   EDIT_DEBIT,
   UPDATE_DEBIT,
 } from "../actions/types";

 const initialState = {
   imports: [],
   debits: [],
   debitToUpdate: {},
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
       case EDIT_DEBIT:
        const index = state.debits.findIndex(
          (debit) => debit._id === action.payload._id
        );
        if (index > -1) {
          return {
            ...state,
            debits: [
              ...state.debits.slice(0, index),
              action.payload,
              ...state.debits.slice(index + 1),
            ],
          };
       };
       case UPDATE_DEBIT:
       return {
         ...state,
         debitToUpdates: action.payload,
       };
     default:
       return state;
   }
 }
 