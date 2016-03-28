var express     = require('express');
var router      = express.Router({mergeParams: true});

var Campground  = require("../models/campground");
var Comment     = require("../models/comment");

router
  .get("/new", isLoggedIn, _newComment)                     //New Comment Form
  .post("/", isLoggedIn, _createComment)                    //Create Comment
  .get("/:cid/edit", checkCommentOwnership, _editComment)   //Edit Comment
  .put("/:cid", checkCommentOwnership, _updateComment)      //Update Comment
  .delete("/:cid", checkCommentOwnership, _deleteComment);  //Destroy Comment

module.exports = router;

//------------------------------------------

function _newComment(request, response) {
  var id = request.params.id;

  Campground.findById(id, function(err, camp) {
    if(err) {
      console.log(err);
    } else {
      var info = {
        title: "Add New Comment to " + camp.name,
        action: "/campgrounds/" + id + "/comments"
      };
      response.render("comments/new", {info: info});
    }
  });
}

function _createComment(request, response) {
  var campId = request.params.id;


  Campground.findById(campId, function(err, camp) {
    if(err) {
      console.log(err);
    } else {
      Comment.create(request.body.comment, function(err, comment) {
        if(err) {
          console.log(err);
        } else {
          comment.author = {
            id: request.user._id,
            username: request.user.username
          };

          comment.save();
          camp.comments.push(comment);
          camp.save();

          response.redirect("/campgrounds/" + campId);
        }
      });
    }
  });

}

function _editComment(request, response) {
  var id = request.params.id;
  var cid = request.params.cid;
  console.log(cid);

  Comment.findById(cid, function(err, comment) {
    var base = "/campgrounds/" + id;
    if(err) {
      response.redirect(base);
    } else {
      var actions = {
        back: base,
        edit: base + "/comments/" + cid + "?_method=PUT"
      };
      
      response.render("comments/edit", {comment: comment, actions: actions});
    }
  });
}

function _updateComment(request, response) {
  var id    = request.params.id,
      cid    = request.params.cid,
      comment  = request.body.comment;

  Comment.findByIdAndUpdate(cid, comment, function(err, updatedComment) {
    if(err) {
      response.redirect("back");
    } else {
      response.redirect("/campgrounds/" + id);
    }
  });
}

function _deleteComment(request, response) {
  var id    = request.params.id;
  var cid    = request.params.cid;

  Comment.findByIdAndRemove(cid, function(err) {
    if(err) {
      console.log(err);
    }

    response.redirect("/campgrounds/" + id);
  });
}

//middlewares
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkCommentOwnership(req, res, next) {
  if(req.isAuthenticated()) {
    Comment.findById(req.params.cid, function(err, comment) {
      if(err) {
        res.redirect("back");
      } else if(comment.author.id.equals(req.user._id)) {
        next();
      } else {
        res.redirect("back");
      }
    });

  } else {
    res.redirect("back");
  }
}