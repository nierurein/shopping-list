const express = require('express');
const User = require('../../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User model
const Item = require('../../models/User');

// @route   POST api/auth
// @desc    Auth user
// @access  public
router.post('/', (req, res) => {
  const {email, password} = req.body;

  // Simple validation
  if(!email || !password) {
    return res.send(400).json({msg: 'Please enter all field'});
  }

  // Check existing model
  User.findOne({email: email})
    .then(user => {
      if(!user) { // no user found
        return res.status(400).json({msg: 'User does not exist'});
      }

      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) {
            return res.status(400).json({msg: 'Invalid credentials'});
          }
          jwt.sign(
            {id: user.id},
            config.get('jwtSecret'),
            {expiresIn: 3600}, // last an hour
            (err, token) => {
              if(err) {
                throw err;
              }
              res.json({
                token: token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              })
            }
          );
        })
    })
});

// @route   GET api/auth/user
// @desc    GET user data
// @access  private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password') // ignore password
    .then(user => res.json(user));
});

module.exports = router;