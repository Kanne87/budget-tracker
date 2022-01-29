const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LabelSchema = new Schema({
   label_name: {
      type: String,
      required: true
   },
   label_color: {
      type: String,
      required: true,
   },
   userId: {
      type: String
   }
});

module.exports = Label = mongoose.model('label', LabelSchema);
