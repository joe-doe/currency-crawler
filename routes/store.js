var express = require('express');
var router = express.Router();
var jsdom = require('jsdom');

var site = 'http://www.piraeusbank.gr/el/Idiwtes/Epitokia-Deltia-Timon/Imerisio-Deltio-Timon-Synallagmatos-Trapezogrammation';
var db = null;
var req = null;
var res = null;

/* GET users listing. */
router.get('/', function(request, result, next) {
  db = request.db;
  req = request;
  res = result;
  store();
});

function failed(e) {
  res.json({'status': e.error});
}

function succeeded() {
  res.json({'status': "OK"});
}

function store(){
  jsdom.env({
    url: site,
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function (err, windowq){
          try {
            //Use jQuery just as in a regular HTML page
            var buy = windowq.$(".PinakasSynallagmatos tr:nth-child(23) .secondcell_1").text();
            var sell = windowq.$(".PinakasSynallagmatos tr:nth-child(23) .forthcell_1").text();

            var collection = db.get(req.config.get('collection_usd'));
            collection.insert({'date': new Date(), 'buy': parseFloat(buy), 'sell': parseFloat(sell)});
            succeeded();
          } catch (e) {
            failed(e);
          }
    }
  });
}

module.exports = router;
