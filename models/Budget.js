const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const BudgetSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   },
   budget_amount: {
      type: Currency,
      default: 0
   },
   budget_intervall: {
      type: String,
      default: 'Monat'
   },
   budget_start: {
      type: Date,
      default: Date.now
   },
   budget_end: {
      type: Date,
      default: ""
   },
   budget_label: {
      type: String,
      default: ""
   },
   userId: {
      type: String,
      default: ""
   },
   filter: {
      type: String,
      default: ""
   },
   filterText: {
      type: String,
      default: ""
   }
});

module.exports = Budget = mongoose.model('budget', BudgetSchema);
