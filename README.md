Open Budget Survey
==================

![](https://secure.travis-ci.org/okfn/open-budget-survey-tracker.png?branch=master)

# Manual install

## Dependancies
- __node & npm__
- __bower__ (for handling vendor libs) `npm install -g bower`

## Installation

    git clone https://github.com/okfn/open-budget-survey-realtime.git
    cd open-budget-survey-realtime
    bower update
    npm install
    gulp build && gulp deploy
    ENV=development npm start

Open: <http://localhost:3000/>

## Development

Whilst developing you should run `gulp watch` as it'll re-compile your assets
for you.


## Translations

To extract strings for translations you can run:

    ./node_modules/.bin/extract-pot --locale i18n --exclude bower_components -t jinja -f html .

To updated po files with new strings you can run:

    ./node_modules/.bin/merge-po i18n

To compile translated po files (to json message files) you can run:

    ./node_modules/.bin/compile-json i18n public/i18n

