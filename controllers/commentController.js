const Comment = require("../models/comment")
const Blog = require("../models/blog")
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator");

exports.comment_get = asyncHandler(async (req, res, next) => {
  const filter = {blog_id: req.params['id']}
  try {
    const comments = await Comment.find(filter)
    res.status(200).json(comments)
  } catch(error) {
    console.log(error)
  }
})

exports.comment_create_post = [
  body("user", "Message must container at least 2 characters")
    .trim()
    .isLength({min: 2})
    .escape(),

  body("message", "Message must container at least 2 characters")
    .trim()
    .isLength({min: 2})
    .escape(),

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
  })
]

//read
exports.comment_detail_get = asyncHandler(async(req, res, next) => {
  res.send('comment detail get')
})

exports.comment_delete = asyncHandler(async(req, res, next) => {
  try {
    const comment = await Comment.findById(req.params['commentId'])
    if(!comment) res.status(202).send("comment does not exist")
    
    await Blog.findByIdAndUpdate({_id: comment.blog_id}, {$pull: {comments: comment._id}})
    await Comment.findByIdAndDelete(req.params['commentId'])
    console.log("Comment Delete")
    res.status(200).send("Comment Delete")
  } catch(error) {
    console.log(error)
  }
  
})

exports.comment_update_post = asyncHandler(async(req,res,next) => {
  res.send('update comment')
})