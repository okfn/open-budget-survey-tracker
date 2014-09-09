var request = require('request');
var fs = require('fs');

var uri = 'http://obstracker.internationalbudget.org/';
// Sets the cache age to an hour
var cache_age = 3600000;

function api_call (endpoint, callback) {
  var cache_file = './cache/'+endpoint+'.json';
  var should_get_from_cache = false;
  var should_update_cache = true;
  var cache_exists = fs.existsSync(cache_file);
  if (cache_exists) {
    should_update_cache = false;
    should_get_from_cache = true;
    var stat = fs.statSync(cache_file);
    var difference = new Date().getTime() - stat.mtime.getTime();
    if (difference > cache_age) {
      should_update_cache = true;
      should_get_from_cache = false;
    }
  }
  if (should_get_from_cache) {
    var data = fs.readFileSync(cache_file);
    callback(JSON.parse(data));
  } else {
    var url = uri+endpoint+'.json';
    request(url, function (error, response, data) {
      if (!error && response.statusCode == 200) {
        if (should_update_cache) {
          fs.writeFileSync(cache_file, data);
        }
        callback(JSON.parse(data));
      } else {
        console.log(error);
      }
    });
  }
}

module.exports = {
  call: api_call
};
