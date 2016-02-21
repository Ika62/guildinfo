var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./routes/conf/defaults.properties');

var method = Default.prototype;

function Default() {
}

method.getGuildInfo = function(realm, name) {
  var dft = {
    'realm':'',
    'name':''
  }
  dft.realm = (typeof realm == 'undefined')? properties.get('defaults.guildrealm') : realm;
  dft.name =(typeof name == 'undefined')? properties.get('defaults.guildname') : name;

  return dft;
}



module.exports = Default;
