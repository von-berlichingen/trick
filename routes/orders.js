var express = require('express');
var router = express.Router();
var restrict = require('../auth/restrict');

router.get('/', restrict, function(req, res, next) {
  var vm = {
    title: 'Place an order',
    firstName: req.user ? req.user.firstName: null
  };
  res.render('orders/index', vm);
});

router.get('/test', function(req, res, next) {
  test ={
    test1: {
      name: "test",
      id: "4"
    },
    test2: {
      name: "test2",
      id: "3"
    }
  };
  res.json(test);
});

module.exports = router;
