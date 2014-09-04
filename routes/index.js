var fs = require('fs');
var path = require('path');
var express = require('express');
var moment = require('moment');
var api = require('./../api.js');
var router = express.Router();

var docs = [
  {
    "title": "Pre-Budget Statement",
    "description": "The purpose of the Pre-Budget Statement is to disclose the parameters of the Executive's Budget Proposal. It outlines the government's macroeconomic assumptions as well as anticipated total revenue and expenditures, and it sets out the debt that will be incurred during the upcoming budget year. The Pre-Budget Statement should be available no less than one month prior to the introduction of the Executive's Budget Proposal. If the Pre-Budget Statement is published less than a month before the Executive's Budget Proposal is submitted to the legislature, it is considered to be 'not publicly available'."
  },
  {
    "title": "Executive's Budget Proposal",
    "description": "The nature of the Executive's Budget Proposal varies from country to country. Sometimes it is a single document, sometimes multiple documents. The Executive's Budget Proposal is the document or documents that the executive submits to the legislature for its approval. It details expected government revenue and the sources of that revenue, as well as allocations to be made to all ministries, and to subnational governments in countries where the national government provides funding to the latter. The Executive's Budget Proposal should be made publicly available when it is first presented to the legislature, or, at a minimum, before the legislature approves it."
  },
  {
    "title": "Enacted Budget",
    "description": "The Enacted Budget is the budget that has been passed into law by the legislature. Unlike most budget documents, the Enacted Budget should be available from the committee within the legislature that deals with the budget, although the Ministry of Finance or other body that houses the executive's budget documents may also have a copy of the Enacted Budget. The Enacted Budget must be released to the public no later than three months after the legislature has approved it."
  },
  {
    "title": "Citizen's Budget",
    "description": "A Citizens Budget is a version of the Executive's Budget Proposal, the Enacted Budget, or any other budget document that is simpler and less technical than the full document. It is normally shorter than the document on which it is based and is specifically designed to convey the key information in the particular document to the general public. A Citizens Budget should be available at the same time that the underlying document is made available. For example, if the Citizens Budget is a simplified version of the Executive's Budget Proposal, it should be released at the same time as the Executive's Budget Proposal."
  },
  {
    "title": "In-Year Report",
    "description": "These may be issued on a quarterly or monthly basis. They may be in the form of a consolidated report for the entire government or multiple reports from different agencies. In-Year Reports should be issued no later than three months after the end of the reporting period. If the report is issued after this date, it is considered as 'not publicly available'."
  },
  {
    "title": "Mid-year Review",
    "description": "The Mid-Year Review contains a comprehensive update on the implementation of the budget as of the middle of the fiscal year, including a review of economic assumptions underlying the budget, and an updated forecast of the budget outcome for the fiscal year. The Mid-Year Review should be available no later than three months after the end of the first six months of the fiscal year."
  },
  {
    "title": "Year-End Report",
    "description": "Generally the Year-End Report is issued as a single, consolidated report for the entire government, but individual ministries may issue separate Year-End Reports. The Year-End Report should be released no later than one year after the end of the fiscal year. The Year-End Report is 'not publicly available' if issued later than one year after the end of the fiscal year it reports on."
  },
  {
    "title": "Audit Report",
    "description": "The Audit Report is issued by the country's supreme audit institution (SAI). It attests to the soundness and completeness of the government's year-end accounts. Unlike most other budget documents, the Audit Report is housed with the SAI. To be considered 'publicly available' the Audit Report must be published within 18 months after the end of the fiscal year to which it relates. The Audit Report would be 'not publicly available' if it is issued after that 18 month period."
  }
];

router.get('/country/:country', function (req, res) {
  api.call('overview', function (countries) {
    var country = {};
    for (var i in countries) {
      if (countries[i].country == req.params.country) {
        country = countries[i];
        break;
      }
    }
    res.render('country', {
      'docs': docs,
      'country': country
    });
  });
});

router.get('/modal/:country', function (req, res) {
  api.call('overview', function (countries) {
    var country = {};
    for (var i in countries) {
      if (countries[i].country == req.params.country) {
        country = countries[i];
        break;
      }
    }
    res.render('modal', {
      'docs': docs,
      'country': country
    });
  });
});

router.get('/about', function (req, res) {
  res.render('about', {});
});

router.get('/', function (req, res) {
  api.call('overview', function (countries) {
    res.render('index', {
      'docs': docs,
      'countries': countries
    });
  });
});

module.exports = router;
