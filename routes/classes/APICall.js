var request = require('request');
var fs = require('fs');
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
  this.MEDIA_URL = properties.get('conf.mediaurl')
  this.LOCALE = properties.get('conf.locale');
};

method.getGuildInfo = function (callback, realm, name) {
  var dft = getDefault.getGuildInfo(realm, name);
  var call_url = this.URL + "guild/" + dft.realm + "/" + dft.name + "?fields=members&locale=" + this.LOCALE + "&apikey=" + this.APIKEY;
  console.log(call_url);
  request(call_url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var obj = JSON.parse(body);
      callback(obj);
    }
  });
};


/**
  Download images from blizzard servers - to bypass canvas domain check security
  Canvas is needed to recolor guild emblems.
*/
method.synchronizeMedia = function(callback) {
  var startTime = new Date();
  var download = function (uri, filename, callback2) {
    request.head(uri, function (err, res, body) {
      if(!err && res.statusCode == 200) {
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback2);
      }
    });
  };

  for (var i = 0; i < 250; i++) {
    var num = i < 10 ? "0"+i : i;
    download(this.MEDIA_URL + 'guild/tabards/emblem_'+num+'.png', 'public/images/guild/tabards/emblem_'+num+'.png', function() {

    });
  }
  for (var i = 0; i < 10; i++) {
    var num = i < 10 ? "0"+i : i;
    download(this.MEDIA_URL + 'guild/tabards/border_'+num+'.png', 'public/images/guild/tabards/border_'+num+'.png', function() {

    });
  }

  download(this.MEDIA_URL + 'guild/tabards/bg_00.png', 'public/images/guild/tabards/bg_00.png', function() {

  });

  download(this.MEDIA_URL + 'guild/tabards/hooks.png', 'public/images/guild/tabards/hooks.png', function() {

  });

  download(this.MEDIA_URL + 'guild/tabards/shadow_00.png', 'public/images/guild/tabards/shadow_00.png', function() {

  });

  download(this.MEDIA_URL + 'guild/tabards/overlay_00.png', 'public/images/guild/tabards/overlay_00.png', function() {

  });

  download(this.MEDIA_URL + 'guild/tabards/ring-horde.png', 'public/images/guild/tabards/ring-horde.png', function() {

  });

  download(this.MEDIA_URL + 'guild/tabards/ring-alliance.png', 'public/images/guild/tabards/ring-alliance.png', function() {
    callback();
  });

}

module.exports = APICall;
