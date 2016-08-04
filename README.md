Open Budget Survey
==================

![](https://secure.travis-ci.org/okfn/open-budget-survey-tracker.png?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/okfn/open-budget-survey-tracker/badge.svg?branch=master)](https://coveralls.io/github/okfn/open-budget-survey-tracker?branch=master)

# Manual install

## Dependancies
- __node & npm__
- __bower__ (for handling vendor libs) `npm install -g bower`

## Installation

    git clone https://github.com/okfn/open-budget-survey-tracker.git
    cd open-budget-survey-tracker
    bower update
    npm install
    gulp build && gulp deploy
    npm start

Open: <http://localhost:3000/>

## Development

    git clone https://github.com/okfn/open-budget-survey-tracker.git
    cd open-budget-survey-tracker
    bower update
    npm install
    npm watch
    ENV=development npm start (in a separate terminal, or run `npm watch` in background)

Open: <http://localhost:3000/>

The watcher will re-compile your assets as you make changes.

## Translations

To extract strings for translations you can run:

    ./node_modules/.bin/extract-pot --locale i18n --exclude bower_components -t jinja -f html .

To updated po files with new strings you can run:

    ./node_modules/.bin/merge-po i18n

To compile translated po files (to json message files) you can run:

    ./node_modules/.bin/compile-json i18n public/i18n

