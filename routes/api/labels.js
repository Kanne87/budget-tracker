const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const auth = require("../../middleware/auth");
const Label = require("../../models/Label");

// @route   GET api budget
// @desc    Get All budgets
// @access  Public
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  
  Label.find({userId: userId})
    .sort({ label_name: -1 })
    .then((label) => res.json(label));
    
});

// @route   POST api/label
// @desc    Create an Budget
// @access  Private
router.post("/", auth, (req, res) => {
  const newLabel = new Label({
    label_name: req.body.label_name,
    label_color: req.body.label_color,
    userId: req.body.userId,
  });

  newLabel.save().then((label) => res.json(label));
});

// @route   DELETE api/items/:id
// @desc    Delete an Item
// @access  Private
router.delete("/:id", auth, (req, res) => {
  Budget.findById(req.params.id)
    .then((budget) => budget.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

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
  });
  Budget.findByIdAndUpdate(id, editBudget).then((budget) => res.json(budget));
});

module.exports = router;
