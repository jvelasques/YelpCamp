var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,

  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },

  //Reference to comments by id
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:  "Comment"
  }]
});

module.exports = mongoose.model("Campground", campgroundSchema);