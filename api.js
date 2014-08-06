var request = require('request');
var uri = 'http://aquarium-staging.herokuapp.com/';

function api_call (endpoint, callback) {
  var url = uri+endpoint+'.json';
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      callback(JSON.parse(body));
    } else {
      console.log(error);
    }
  });
}

module.exports = {
  call: api_call
}
