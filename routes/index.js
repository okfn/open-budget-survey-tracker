var fs = require('fs');
var path = require('path');
var express = require('express');
var moment = require('moment');
var api = require('./../api.js');
var router = express.Router();

function build_tooltips_in_cells (country, cells) {
  for (var i in cells) {
    if (cells[i] != null) {
      var date = ( typeof cells[i].date === 'undefined' ) ? false : cells[i].date;
      var state = cells[i].state;
      var tooltip = country+"'s "+cells[i].type+" is "+state;
      if (date) {
        var date_string = moment(date).format('Do MMMM YYYY');
        if (state == 'waiting') {
          tooltip += " and it is expected at "+date_string;
        } else if (state == 'late') {
          tooltip += " and it was expected at "+date_string;
        }
      }
      cells[i].tooltip = tooltip;
    }
  }
  return cells;
}

router.get('/country/:code', function (req, res) {
  api.call('country:'+req.params.code, function (country) {
    for (var i in country.data) {
      country.data[i].cells = build_tooltips_in_cells(country.country, country.data[i].cells);
    }
    res.render('country', {
      'docs': [
        "Pre-Budget Statement",
        "Executive's Budget Proposal",
      ],
      'country': country
    });
  });
});

router.get('/about', function (req, res) {
  res.render('about', {});
});

router.get('/modal', function (req, res) {
  var data = fs.readFileSync(path.join(__dirname, '..', 'views', 'modal.html'));
  res.send(data);
});

router.get('/', function (req, res) {
  api.call('overview', function (countries) {
    for (var i in countries) {
      countries[i].cells = build_tooltips_in_cells(country.country, countries[i].cells);
    }
    res.render('index', {
      'q': req.param('q'),
      'countries': countries
    });
  });
});

module.exports = router;
