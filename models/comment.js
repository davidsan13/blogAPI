const mongoose = require("mongoose");

const Schema = mongoose.Schema

const CommentSchema = new Schema({
  user : {type: String, required: true},
  message : {type: String, required: true},
  createdTime: {type: Date},
  blog_id: {type:Schema.Types.ObjectId, ref: "Blog"},
})




// Virtual for user's URL
CommentSchema.virtual("url").get(function () {
  return `/comment/${this._id}`;
})

module.exports = mongoose.model("Comment", CommentSchema)