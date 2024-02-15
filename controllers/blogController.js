const Blog = require("../models/blog")
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator");


exports.blog_get = asyncHandler(async (req, res, next) => {
  res.send("blog: all blogs" )
})

//create
exports.blog_create_get = asyncHandler(async (req, res, next) => {
  res.send("blog: get create")
})

exports.blog_create_post = asyncHandler(async (req, res, next) => {
  res.send("blog: post create")
})

//read
exports.blog_detail = asyncHandler(async (req, res, next) => {
  res.send("blog: blog detail")
})

//delete
exports.blog_delete_get = asyncHandler(async (req, res, next) => {
  res.send("blog: blog delete get")
})

exports.blog_delete_post = asyncHandler(async (req, res, next) => {
  res.send("blog: blog delete post")
})

//update
exports.blog_update_get = asyncHandler(async (req, res, next) => {
  res.send("blog: blog update get")
})

exports.blog_update_post = asyncHandler(async (req, res, next) => {
  res.send("blog: blog update post")
})

