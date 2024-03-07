const Comment = require("../models/comment")
const Blog = require("../models/blog")
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator");

exports.comment_get = asyncHandler(async (req, res, next) => {
  const filter = {blog_id: req.params['id']}
  try {
    const comments = await Comment.find(blog)
    res.status(200).json(comments)
  } catch(error) {
    console.log(error)
  }
})

// create
// exports.comment_create_post = asyncHandler(async (req, res, next) => {
//   console.log(req.body.blogId)
//   res.send("get create")
// })

exports.comment_create_post = [
  body("user", "Message must container at least 2 characters")
    .trim()
    .isLength({min: 2})
    .escape(),

  body("message", "Message must container at least 2 characters")
    .trim()
    .isLength({min: 2})
    .escape(),
  
  // body("published", "Message must container at least 2 characters")
  //   .trim()
  //   .isLength({min: 2})
  //   .escape(),

  // body("publishedAt", "Message must container at least 2 characters")
  //   .trim()
  //   .isLength({min: 2})
  //   .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    var date = new Date()
    const comment = new Comment({
      user: req.body.user,
      message: req.body.message,
      createdTime: date.toLocaleString(),
      blog_id: req.params.blogId,
    })
    
    try {
      const response = await comment.save()
      await Blog.findByIdAndUpdate({_id: response.blog_id}, {$push: {comments: response._id}})
      console.log("Comment created and saved to DB")
      res.status(201).json(response)
    } catch (errors) {
      console.log(errors)
    }
  //   if(!errors.isEmpty()) {
  //     res.render('index', {
  //       errors: errors.array(),
  //     });
  //     return;
  //   } else {
  //     const response = await comment.save()
  //     res.status(201).json(response)
  //   }
  // res.render('POST create')
  })
]

//read
exports.comment_detail_get = asyncHandler(async(req, res, next) => {
  res.send('comment detail get')
})

exports.comment_delete = asyncHandler(async(req, res, next) => {
  res.send('delete comment')
})

exports.comment_update_post = asyncHandler(async(req,res,next) => {
  res.send('update comment')
})