const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const auth = require("../../middleware/auth");

const Match = require("../../models/Matches");

// @route   GET api budget
// @desc    Get All budgets
// @access  Public
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  Match.find( {userId: userId})
    .sort({ date: -1 })
    
    .then((match) => res.json(match));
});

// @route   POST api/matches
// @desc    Create an Match
// @access  Private
router.post("/", auth, (req, res) => {
   const newMatch = new Match({
     budget_id: req.body.budget_id,
     debit_id: req.body.debit_id,
     user_id: req.body.user_id,
   });
 
   newMatch.save().then((match) => res.json(match));
 });

 // @route   DELETE api/items/:id
// @desc    Delete an Item
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Match.findById(req.params.id)
    .then((match) => match.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

/* 



// @route   EDIT api/items/:id
// @desc    Edit an Item
// @access  Public
router.put("/:id", auth, (req, res) => {
  const id = req.params.id;
  const editBudget = new Budget({
    _id: id,
    name: req.body.name,
    budget_amount: req.body.budget_amount,
    budget_intervall: req.body.budget_intervall,
    budget_start: req.body.budget_start,
    budget_end: req.body.budget_end,
    budget_label: req.body.budget_label,
    userId: req.body.userId,
  });
  Budget.findByIdAndUpdate(id, editBudget).then((budget) => res.json(budget));
}); */

module.exports = router;
