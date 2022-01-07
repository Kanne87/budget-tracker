const mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);
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
      type: Float,
      default: 0
   },
   budget_intervall: {
      type: String,
      default: 'Monat'
   }
});

module.exports = Budget = mongoose.model('budget', BudgetSchema);
