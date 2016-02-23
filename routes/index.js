var Twig = require("twig"),
    express = require('express'),
    app = express();
var router = express.Router();

var APICall = require('./classes/APICall.js');
var api = new APICall();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.twig', { message: 'Twig' });
});

router.get('/test', function(req, res, next) {

  var _guild = api.getGuildInfo(function(_guild) {
    res.render('test.twig', { guild : _guild });
  });
});

module.exports = router;
