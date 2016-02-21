var request = require('request');
var Guild = require('./Guild.js');
var Default = require('./Default.js');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./routes/conf/conf.properties');
var method = APICall.prototype;
var getDefault = new Default();

/**
 * @name APICall
 * @constructor
 */
function APICall() {
  this.APIKEY = properties.get('conf.apikey');
  this.URL = properties.get('conf.apiurl');
  this.LOCALE = properties.get('conf.locale');
};

method.getGuildInfo = function (callback, realm, name) {
  var dft = getDefault.getGuildInfo(realm, name);
  var call_url = this.URL + "guild/" + dft.realm + "/" + dft.name + "?locale=" + this.LOCALE + "&apikey=" + this.APIKEY;
  console.log(call_url);
  request(call_url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var obj = JSON.parse(body);
      var _guild = new Guild(obj.name);
      _guild.setLevel(obj.level);
      _guild.setRealm(obj.realm);
      _guild.setPoints(obj.achievementPoints);
      callback(_guild);
    }
  });
};

module.exports = APICall;
