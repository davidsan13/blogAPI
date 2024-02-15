const mongoose = require("mongoose");

const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {type: String, required: true},
  password: {type:String, required: true},
  admin: {type: Boolean}
})

// Virtual for user's full name
UserSchema.virtual("name").get(function () {
  let fullname = "";
  if(this.first_name && this.last_name) {
    fullname = `${this.first_name} ${this.last_name}`
  }
  return fullname
})

// Virtual for user's URL
UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
})

module.exports = mongoose.model("User", UserSchema)