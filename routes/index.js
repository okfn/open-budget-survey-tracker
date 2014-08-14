var fs = require('fs');
var path = require('path');
var express = require('express');
var moment = require('moment');
var api = require('./../api.js');
var router = express.Router();

router.get('/about', function (req, res) {
  res.render('about', {});
});

router.get('/modal', function (req, res) {
  var data = fs.readFileSync(path.join(__dirname, '..', 'views', 'modal.html'));
  res.send(data);
});

router.get('/', function (req, res) {
  api.call('overview', function (countries) {
    for (var x in countries) {
      for (var y in countries[x].cells) {
        if (countries[x].cells[y] != null) {
          var date = ( typeof countries[x].cells[y].date === 'undefined' ) ? false : countries[x].cells[y].date;
          var state = countries[x].cells[y].state;
          var tooltip = countries[x].country+"'s "+countries[x].cells[y].type+" is "+state;
          if (date) {
            var date_string = moment(date).format('Do MMMM YYYY');
            if (state == 'waiting') {
              tooltip += " and it is expected at "+date_string;
            } else if (state == 'late') {
              tooltip += " and it was expected at "+date_string;
            }
          }
          countries[x].cells[y].tooltip = tooltip;
        }
      }
    }
    res.render('index', {
      'q': req.param('q'),
      'countries': countries
    });
  });
});

module.exports = router;
