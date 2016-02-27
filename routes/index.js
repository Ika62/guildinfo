var Twig = require("twig"),
    express = require('express'),
    app = express();
var router = express.Router();
Twig.extendFilter('foo', function (value) {
  return util.format(value);
});

var APICall = require('./classes/APICall.js');
var api = new APICall();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.twig', { message: 'Twig' });
});

router.get('/guild', function(req, res, next) {
  var _guild = api.getGuildInfo(function(_guild) {
    res.render('guild.twig', { guild : _guild });
  });
});

router.get('/synchronize-media', function(req, res, next) {
  api.synchronizeMedia(function() {
    res.render('synchronize.twig');
  });
});

module.exports = router;
