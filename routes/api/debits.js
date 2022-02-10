const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const auth = require("../../middleware/auth");

const Debit = require("../../models/Debit");

// @route   GET api debits
// @desc    Get All debits
// @access  Public
router.get("/:user_id", (req, res) => {
  const userId = req.params.user_id;
  Debit.find( {user_id: userId})
    .sort({ date: -1 })
    .then((debit) => res.json(debit));
});

// @route   POST api/budgets
// @desc    Create an Budget
// @access  Private
router.post("/", auth, (req, res) => {
  const newDebit = new Debit({
   debit_date: req.body.debit_date,
   debit_amount: req.body.debit_amount,
   debit_desc: req.body.debit_desc,
   debit_type: req.body.debit_type,
   debit_sourceId: req.body.debit_sourceId,
   debit_mandat: req.body.debit_mandat,
   debit_source: req.body.debit_source,
   debit_account: req.body.debit_account,
   debit_bic: req.body.debit_bic,
   debit_booked: req.body.debit_booked,
   debit_budget_id: req.body.debit_budget_id,
   user_id: req.body.user_id,
  });

  newDebit.save().then((debit) => res.json(debit));
});

// @route   EDIT api/debits/:id
// @desc    Edit an Debit
// @access  Public
router.put("/:id", auth, (req, res) => {
  const id = req.params.id;
  const editDebit = new Debit({
    _id: id,
    debit_date: req.body.debit_date,
    debit_amount: req.body.debit_amount,
    debit_desc: req.body.debit_desc,
    debit_type: req.body.debit_type,
    debit_sourceId: req.body.debit_sourceId,
    debit_mandat: req.body.debit_mandat,
    debit_source: req.body.debit_source,
    debit_account: req.body.debit_account,
    debit_bic: req.body.debit_bic,
    debit_booked: req.body.debit_booked,
    debit_budget_id: req.body.debit_budget_id,
    user_id: req.body.user_id,
  });
  Debit.findByIdAndUpdate(id, editDebit).then((debit) => res.json(debit));
});


module.exports = router;
