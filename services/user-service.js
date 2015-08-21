var User = require('../models/user');
var bcrypt = require('bcrypt');

/**
  Must find the problem with the password hashing later
**/

exports.addUser = function(user, next) {
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    var newUser = new User({
      firstName: user.firstName,
      lastName: user.lastName,
      roomNumber: user.roomNumber,
      email: user.email,
      password: hash
    });

    newUser.create(function(err) {
      if (err){
        return next(err);
      }
      next(null);
    });
  });
};

exports.findUser = function(email, next) {
  User.findOne({email: email.toLowerCase()}, function(err, user) {
next(err, user);
  });
};

exports.showUser = function(id, next) {
  User.findById(id, function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    }
    //console.log({user: user});
    next(null, user);
  });
};
