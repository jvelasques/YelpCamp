var express     = require('express');
var router      = express.Router();
var Campground  = require("../models/campground");

router
  .get('/', _listCampgrounds)                             //Campgrounds Index
  .get("/new", isLoggedIn, _newCamp)                      //New campground form
  .post("/", isLoggedIn, _createCampground)               //Create campground
  .get("/:id", _showCamp)                                 //Show campground info
  .get("/:id/edit", checkCampgroundOwnership, _editCamp)  //Edit campground
  .put("/:id", checkCampgroundOwnership, _updateCamp)     //Update Campground
  .delete("/:id", checkCampgroundOwnership, _deleteCamp); //Destroy Campground

module.exports = router;

function _newCamp(request, response) {
  request.render("campgrounds/new");
}

function _listCampgrounds(request, response) {
  Campground.find({}, function(err, camps) {
    if(err) {
      console.log(err);
    } else {
      response.render("campgrounds/index", {campgrounds: camps});
    }
  });
}

function _showCamp(request, response) {
  var id = request.params.id;
  Campground.findById(id).populate("comments").exec(function(err, camp) {
    if(err || !camp) {
      console.log(err);
    } else {
      var base = "/campgrounds/" + id;
      
      var actions = {
        delete_camp: base + "?_method=DELETE",
        edit_camp: base + "/edit",
        comment: base + "/comments/"
      };

      response.render("campgrounds/show", {campground: camp, actions: actions})
    }
  });
}

function _createCampground(request, response) {
  //can do some validation before creating
  var camp = request.body.campground;
  camp.author = {
    id: request.user._id,
    username: request.user.username
  };

  Campground.create(camp, function(err, newCamp) {
    if(err) {
      console.log(err);
    } else {
      console.log(newCamp);
      response.redirect("/campgrounds");
    }
  });
}

function _editCamp(request, response) {
  var id = request.params.id;

  Campground.findById(id, function(err, camp) {
    if(err) {
      response.redirect("/campgrounds");
    } else {
      camp.action = "/campgrounds/" + id + "?_method=PUT";
      response.render("campgrounds/edit", {campground: camp});
    }
  });
}

function _updateCamp(request, response) {
  var id    = request.params.id,
      camp  = request.body.campground;
  Campground.findByIdAndUpdate(id, camp, function(err, updatedCamp) {
    if(err) {
      response.redirect("/campgrounds");
    } else {
      response.redirect("/campgrounds/" + id);
    }
  });
}

function _deleteCamp(request, response) {
  var id    = request.params.id;

  Campground.findByIdAndRemove(id, function(err) {
    if(err) {
      console.log(err);
    }

    response.redirect("/campgrounds");
  });
}

//middleware
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next) {
  if(req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, camp) {
      if(err) {
        res.redirect("back");
      } else if(camp.author.id.equals(req.user._id)) {
        next();
      } else {
        res.redirect("back");
      }
    });

  } else {
    res.redirect("back");
  }
}

