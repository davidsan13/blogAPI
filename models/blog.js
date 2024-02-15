const mongoose = require("mongoose");

const Schema = mongoose.Schema

const BlogSchema = new Schema({
  title : {type: String, required: true},
  content : {type: String, required: true},
  published: {type: Boolean, required: true},
  publishedAt: {type: Date, required: true},
})

// Virtual for user's URL
BlogSchema.virtual("url").get(function () {
  return `/blog/${this._id}`;
})

module.exports = mongoose.model("Blog", BlogSchema)