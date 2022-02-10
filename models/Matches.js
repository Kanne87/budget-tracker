const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MatchSchema = new Schema({
   budget_id: {
      type: String,
      required: true,
   },
   debit_id: {
      type: String,
      required: true,
   },
   user_id: {
      type: String,
      required: true,
   }
});

module.exports = Match = mongoose.model('match', MatchSchema);
