const User = require("../models/user")
const Blog = require("../models/blog")
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.admin_signup_post = [
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

exports.admin_login_post = asyncHandler(async (req, res, next) => {
  const email = req.body.email
  // const user = {name: email}
  const password = req.body.password
  // const user = {name: email}
  try {
    const user = await User.findOne({email: email});
    if(!user) {
      res.json({message: "Incorrect username"})
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match) {
      res.json({message: "Incorrect password"})
    }
    const maxAge = 3 * 24 * 60 * 60
    const iat = Math.floor(Date.now() / 1000)
    const exp = iat + 60 // seconds 
    const accessToken = jwt.sign({user}, process.env.secretKey, {
      // iat,
      // expiresIn: exp
     
    });
      res
        .cookie("access_token", accessToken, {
          // httpOnly: true,
          secure: true,

          // sameSite: "none"
          // secure: process.env.NODE_ENV === 'production',
        })
        // .setHeader("accessToken", 'Bearer' + accessToken)
        .status(200)
        .json({message: "success", accessToken: accessToken})

  } catch(err) {
    return (err)
  }

})
exports.admin_logout = asyncHandler(async(req,res,next) => {
  return res
    .clearCookie("access_token")
    .status(200)
    .json({message: "success"})

})
exports.admin_blog_get = asyncHandler( async(req, res, next) => {
  try {
    const Blogs = await Blog.find()
    if(Blogs.length == 0) {
      console.log("Not Data")
      res.status(204).send("No Data")
    } else {
      console.log("Retrieve All Blogs")
      res.status(200).json(Blogs)
    }
  } catch (error) {
    console.error(error)
  }})

exports.admin_blog_create_post = asyncHandler( async(req, res, next) => {
  console.log('create blog')
  res.json("create blog")

})

exports.admin_blog_create_get = asyncHandler( async(req, res, next) => {
  console.log("Hello")
})
exports.admin_update_post = asyncHandler( async(req, res, next) => {
  res.json({message: `blog post ${req.params['blogId']} updated`})
})

exports.admin_blog_delete_post = asyncHandler( async(req, res, next) => {
  res.json({message: `blog post ${req.params['blogId']} deleted`})
})

exports.admin_comment_delete_post = asyncHandler( async(req, res, next) => {
  res.json({message: `comment post ${req.params['commentId']} deleted`})
})