const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
      type: Number,
      default: 0
   },
   budget_intervall: {
      type: String,
      default: 'Monat'
   }
});

module.exports = Budget = mongoose.model('budget', BudgetSchema);
