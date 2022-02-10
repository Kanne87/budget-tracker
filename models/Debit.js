const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

const DebitSchema = new Schema({
   debit_account: {
      type: String
      
   },
   debit_amount: {
      type: Currency,
      default: 0,
      required: true,
   },
   debit_bic: {
      type: String,
      default: "",
   },
   debit_booked: {
      type: String,
      default: ""
   },
   debit_date: {
      type: Date,
      required: true
   },
   debit_desc: {
      type: String,
      default: ""
   },
   debit_mandat: {
      type: String,
      default: ""
   },
   debit_source: {
      type: String,
      default: ""
   },
   debit_sourceId: {
      type: String,
      default: ""
   },
   debit_type: {
      type: String,
      default: ""
   },
   user_id: {
      type: String,
      default: ""
   },
   debit_budget_id: {
      type: String,
      default: ""
   }
});

module.exports = Debit = mongoose.model('debit', DebitSchema);
