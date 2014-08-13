var fs = require('fs');
var path = require('path');
var express = require('express');
var api = require('./../api.js');
var router = express.Router();

router.get('/modal', function(req, res) {
	var data = fs.readFileSync(path.join(__dirname, '..', 'views', 'modal.html'));
  res.send(data);
});

router.get('/', function(req, res) {
  api.call('overview', function (countries) {
    res.render('index', {
      'q': req.param('q'),
      'countries': countries
    });
  });
});

module.exports = router;
