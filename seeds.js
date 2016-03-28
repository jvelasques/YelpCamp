var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");

var campgrounds = [
  {
    name: "Salmon Creek",
    image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed fringilla diam, at blandit metus. Donec sed consectetur erat. Ut nec efficitur risus, nec hendrerit neque. In non eleifend felis. Duis lorem odio, facilisis eget metus sit amet, posuere congue lectus. Maecenas varius viverra suscipit. Aliquam erat volutpat. Donec ac lorem convallis, aliquet sapien id, finibus augue. Integer id leo ac orci tempus cursus. Integer non justo pellentesque, interdum augue quis, dictum elit. Proin commodo risus ac odio aliquam placerat. Fusce non mauris sit amet mi rutrum elementum a ut metus. Suspendisse bibendum varius purus eu mollis."
  }, {
    name: "Granite Hill",
    image: "https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg",
    description: "Pellentesque sagittis iaculis erat, eu molestie diam elementum ac. Donec a dui non purus condimentum accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut bibendum ultrices risus convallis dapibus. Nullam nec libero dignissim augue tristique commodo eu eget nibh. Pellentesque efficitur eros urna, laoreet elementum mi aliquet et. Donec ac tincidunt arcu, a congue nunc. Nulla facilisi. Quisque ultrices varius scelerisque. Mauris vitae pretium massa. Ut lacinia placerat quam in ultricies. Fusce eget metus pellentesque, tincidunt augue nec, varius dolor."
  }, {
    name: "Mountain Goat's Rest",
    image: "https://farm5.staticflickr.com/4048/4661960920_a9bd6d972f.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed fringilla diam, at blandit metus. Donec sed consectetur erat. Ut nec efficitur risus, nec hendrerit neque. In non eleifend felis. Duis lorem odio, facilisis eget metus sit amet, posuere congue lectus. Maecenas varius viverra suscipit. Aliquam erat volutpat. Donec ac lorem convallis, aliquet sapien id, finibus augue. Integer id leo ac orci tempus cursus. Integer non justo pellentesque, interdum augue quis, dictum elit. Proin commodo risus ac odio aliquam placerat. Fusce non mauris sit amet mi rutrum elementum a ut metus. Suspendisse bibendum varius purus eu mollis."
  }, {
    name: "Salmon Creek",
    image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg",
    description: "Pellentesque sagittis iaculis erat, eu molestie diam elementum ac. Donec a dui non purus condimentum accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut bibendum ultrices risus convallis dapibus. Nullam nec libero dignissim augue tristique commodo eu eget nibh. Pellentesque efficitur eros urna, laoreet elementum mi aliquet et. Donec ac tincidunt arcu, a congue nunc. Nulla facilisi. Quisque ultrices varius scelerisque. Mauris vitae pretium massa. Ut lacinia placerat quam in ultricies. Fusce eget metus pellentesque, tincidunt augue nec, varius dolor."
  }, {
    name: "Granite Hill",
    image: "https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed fringilla diam, at blandit metus. Donec sed consectetur erat. Ut nec efficitur risus, nec hendrerit neque. In non eleifend felis. Duis lorem odio, facilisis eget metus sit amet, posuere congue lectus. Maecenas varius viverra suscipit. Aliquam erat volutpat. Donec ac lorem convallis, aliquet sapien id, finibus augue. Integer id leo ac orci tempus cursus. Integer non justo pellentesque, interdum augue quis, dictum elit. Proin commodo risus ac odio aliquam placerat. Fusce non mauris sit amet mi rutrum elementum a ut metus. Suspendisse bibendum varius purus eu mollis."
  }, {
    name: "Mountain Goat's Rest",
    image: "https://farm5.staticflickr.com/4048/4661960920_a9bd6d972f.jpg",
    description: "Pellentesque sagittis iaculis erat, eu molestie diam elementum ac. Donec a dui non purus condimentum accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut bibendum ultrices risus convallis dapibus. Nullam nec libero dignissim augue tristique commodo eu eget nibh. Pellentesque efficitur eros urna, laoreet elementum mi aliquet et. Donec ac tincidunt arcu, a congue nunc. Nulla facilisi. Quisque ultrices varius scelerisque. Mauris vitae pretium massa. Ut lacinia placerat quam in ultricies. Fusce eget metus pellentesque, tincidunt augue nec, varius dolor."
  }, {
    name: "Salmon Creek",
    image: "https://farm3.staticflickr.com/2311/2123340163_af7cba3be7.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed fringilla diam, at blandit metus. Donec sed consectetur erat. Ut nec efficitur risus, nec hendrerit neque. In non eleifend felis. Duis lorem odio, facilisis eget metus sit amet, posuere congue lectus. Maecenas varius viverra suscipit. Aliquam erat volutpat. Donec ac lorem convallis, aliquet sapien id, finibus augue. Integer id leo ac orci tempus cursus. Integer non justo pellentesque, interdum augue quis, dictum elit. Proin commodo risus ac odio aliquam placerat. Fusce non mauris sit amet mi rutrum elementum a ut metus. Suspendisse bibendum varius purus eu mollis."
  }, {
    name: "Granite Hill",
    image: "https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg",
    description: "Pellentesque sagittis iaculis erat, eu molestie diam elementum ac. Donec a dui non purus condimentum accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut bibendum ultrices risus convallis dapibus. Nullam nec libero dignissim augue tristique commodo eu eget nibh. Pellentesque efficitur eros urna, laoreet elementum mi aliquet et. Donec ac tincidunt arcu, a congue nunc. Nulla facilisi. Quisque ultrices varius scelerisque. Mauris vitae pretium massa. Ut lacinia placerat quam in ultricies. Fusce eget metus pellentesque, tincidunt augue nec, varius dolor."
  }
];

function _cleanAll() {
  Campground.remove({}, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("All Camps were removed");
      //_populateCampgrounds();
    }
  });
}

function _populateCampgrounds() {
  campgrounds.forEach(function(camp) {
    Campground.create(camp, function(err, data) {
      if(err) {
        console.log(err);
      } else {
        console.log("Camp created"/*, created*/);
        _createComment(data, "Homer", "This is a great campground!");
      }
    })
  });
}

function _createComment(camp, author, text) {
  Comment.create({
    author: author,
    text: text
  }, function(err, comment) {
    if(err) {
      console.log(err);
    } else {
      camp.comments.push(comment);
      camp.save();
      console.log("Comment created");
    }
  });
}

module.exports = function() {
  //_cleanAll();
};
