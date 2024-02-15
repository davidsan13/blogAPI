
const User = require("../models/user")
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator");
// const passport = require("passport");
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");

// index 

// user controller
exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render('signup')
})

exports.user_create_post = [
  // Validate and Sanitize the field.
  body("firstName", "First name must contain at least 2 characters")
    .trim()
    .isLength({min: 2})
    .escape(),
  
  body("lastName", "last name must contain at least 2 characters")
    .trim()
    .isLength({min: 2})
    .escape(),
  
  body("email", "email must contain at least 2 characters")
    .trim()
    .escape()
    .normalizeEmail()
    .isEmail(),
  
  body("password", "password must contain at least 5 characters")
    .trim()
    .isLength({min: 5})
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const encryptPW = await bcrypt.hash(req.body.password, 10)
    
    const user = new User({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: encryptPW
    })
  
    if(!errors.isEmpty()) {
      res.render("signup", {
        errors: errors.array(),
      });
      return;
    } else {
      const userExists = await User.findOne({ email: req.body.email})
        .collation({locale: "en", strength: 2})
        .exec();
      if(userExists) {
        res.redirect("/signup", {message: "existing email"})
      } else {
        console.log(user)
        await user.save()
        res.json(user)
      }
    }
  })
]

exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render('signin')
})

exports.user_login_post = asyncHandler(async (req, res, next) => {
  const email = req.body.email
  const user = {name: email}
  const password = req.body.password

  try {
    const user = await User.findOne({email: email});
    if(!user) {
      res.json({message: "Incorrect username"})
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match) {
      res.json({message: "Incorrect password"})
    }
    const accessToken = jwt.sign(user, 'secretKey')
    res.json({accessToken: accessToken})
  } catch(err) {
    return (err)
  }

})

const post = [
  {
    username: 'sandavid08@yahoo.com',
    title: 'Post 1'
  },
  {
    username: 'richard',
    title: 'Post 2'
  }
]
exports.user_post_get = asyncHandler(async (req, res,) => {
  res.json(post.filter(post => post.username === req.user.name))
})
