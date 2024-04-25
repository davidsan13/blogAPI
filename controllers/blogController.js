const Blog = require("../models/blog")
const Comment = require("../models/comment")

const asyncHandler = require("express-async-handler")
const { body, validationResult, check } = require("express-validator");


exports.blog_get_four = asyncHandler(async (req, res, next) => {
  try {
    const Blogs = await Blog.find().limit(4)
    if(Blogs.length == 0) {
      console.log("Not Data")
      res.status(204).send("No Data")
    } else {
      console.log("Retrieve All Blogs")
      res.status(200).json(Blogs)
    }
  } catch (error) {
    console.error(error)
  }
})

exports.blog_get_all = asyncHandler(async(req, res, next) => {
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
  }
})

//create
exports.blog_create_get = asyncHandler(async (req, res, next) => {
  res.send("blog: get create")
})

exports.blog_create_post = [

  body("title", "Message must container at least 2 characters")
    .trim()
    .isLength({min: 2})
    .escape(),

  body("content", "Message must container at least 2 characters")
    .trim()
    .isLength({min: 2})
    .escape(),
  
  check('published')
    .isBoolean()
    .withMessage('Published must be a boolean value'),
    


  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    var date = new Date()
    const blog = new Blog({
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
      publishedAt: date.toLocaleString(),
    })
    console.log(req.body)
    if(!errors.isEmpty()) {
      res.render('index', {
        errors: errors.array(),
      });
      return;
    } else {
      const response = await blog.save()
      res.status(201).json(response)
    }
  res.render('POST create')
})]

//read
exports.blog_detail_get = asyncHandler(async (req, res, next) => {
  try{
    const comments = await Comment.find({blog_id: req.params['blogId']}).sort({'createdTime': -1})
    const blog = await Blog.findById(req.params['blogId']).exec()
    res.status(200).json({blog, comments})
  } catch (error) {
    console.log(error)
  }
})

//delete
exports.blog_delete = asyncHandler(async (req, res, next) => {
  try{
    const blog = await Blog.findByIdAndDelete(req.params['blogId'])
    console.log(blog)
    res.status(200).redirect('/')
  } catch(error) {
    console.log(error)
  }
})

//update
exports.blog_update_post = asyncHandler(async (req, res, next) => {
  const update = {}
  const filter = {_id: req.params['id']}
  if(req.body.title) update.title = req.body.title
  if(req.body.content) update.content = req.body.content
  if(req.body.published) update.published = req.body.published

  try {
    const blog = await Blog.findOneAndUpdate(filter, update, { new: true})
    res.status(200).json(blog)
  } catch(error) {
    console.log(error)
  }
})