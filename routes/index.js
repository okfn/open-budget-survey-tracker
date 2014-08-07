var express = require('express');
var api = require('./../api.js');
var router = express.Router();

router.get('/', function(req, res) {
  api.call('overview', function (countries) {
    res.render('index', {
      'q': req.param('q'),
      'countries': countries
    });
  });
});

module.exports = router;
