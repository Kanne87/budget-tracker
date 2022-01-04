const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

const Budget = require('../../models/Budget')

// @route   GET api budget
// @desc    Get All budgets
// @access  Public
router.get('/', (req, res) => {
   Budget
      .find()
      .sort({date: -1 })
      .then(budget => res.json(budget))
});

// @route   POST api/budgets
// @desc    Create an Budget
// @access  Public
router.post('/', (req, res) => {
   const newBudget = new Budget({
      name: req.body.name,
      budget_amount: req.body.budget_amount,
      budget_intervall: req.body.budget_intervall
   });
   
   newBudget.save().then(budget => res.json(budget));
});

// @route   DELETE api/items/:id
// @desc    Delete an Item
// @access  Public
router.delete('/:id', (req, res) => {
   Budget
      .findById(req.params.id)
      .then(budget => budget
         .remove()
         .then(() => res
            .json({success: true})
         )
      )
      .catch(err => res
         .status(404)
         .json({success: false})
      );
});

// @route   EDIT api/items/:id
// @desc    Edit an Item
// @access  Public
router.put('/:id', (req, res) => {
   Budget
      .findById(req.params.id)
      .then(budget => budget
         .remove()
         .then(() => res
            .json({success: true})
         )
      )
      .catch(err => res
         .status(404)
         .json({success: false})
      );
});

module.exports = router; 