var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/user-service');
var config = require('../config');
var restrict = require('../auth/restrict');

/* GET users listing. */


/* GET /users/create */
router.get('/create', function(req, res, next) {
  var vm = {
    title: 'Create an account'
  };
  res.render('users/create', vm);
});

router.post('/create', function(req, res, next) {
  userService.addUser(req.body, function(err){
    if(err) {
      var vm = {
        title: 'Create an account',
        input: req.body,
        error: err
      };
      delete vm.input.password;
      console.log(err)
      return res.render('users/create', vm);
    }
    req.login(req.body, function(err) {
      res.redirect('/orders');
    });
  });
});

router.post('/login',
  passport.authenticate('local', {
   failureRedirect: '/',
   successRedirect: '/users/',
   failureFlash: 'Invalid credentials'
  }));

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/', restrict, function(req, res, next) {
  var vm = {
    title: 'Welcome',
    firstName: req.user ? req.user.firstName: null
  };
  res.render('users/home', vm);
});

router.get('/profile', restrict, function(req, res, next) {
  userService.showUser(req.user._id, function(err, user){
    if (err) {
      return res.status(500).json({error: 'Failed to retrieve profile'});
    }
    var vm = {
      title: 'Welcome',
      profile: user.firstName
    };
    //res.render('users/profile', vm);
    console.log({profile: user});
    res.json(user);
  });
});

router.get('/account', restrict, function(req, res, next) {
  userService.showUser(req.user._id, function(err, user){
    if (err) {
      return res.status(500).json({error: 'Failed to retrieve profile'});
    }
    var home = {
      title: 'home',
      profile: user.firstName
    };
    //res.render('users/profile', vm);
    console.log({home: user});
    res.json(user);
  });
});

module.exports = router;
