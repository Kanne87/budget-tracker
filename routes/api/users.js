const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require("../../models/User");
const { InvertColorsOff } = require("@material-ui/icons");

// @route   POST api/users
// @desc    Register new User
// @access  Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
     return res.status(400).json({ msg: 'Bitte alle Felder ausfüllen'});
  }
  User.findOne({ email })
   .then(user => {
      if(user) return res.status(400).json({ msg: "Benutzer existiert bereits "});
      const newUser = new User({
         name,
         email,
         password
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
         bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
               .then(user => {
                  res.json({
                     user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                     }
                  });
               })
         })
      });
   })
});



module.exports = router;
