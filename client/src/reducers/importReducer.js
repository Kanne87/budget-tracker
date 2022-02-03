import {
   IMPORT_ITEMS,
   IMPORT_LOADING,
 } from "../actions/types";

 const initialState = {
   imports: [],
   loading: false,
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
     default:
       return state;
   }
 }
 