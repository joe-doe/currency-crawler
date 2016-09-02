var express = require('express');
var router = express.Router();
var jsdom = require('jsdom');

var site = 'http://www.piraeusbank.gr/el/Idiwtes/Epitokia-Deltia-Timon/Imerisio-Deltio-Timon-Synallagmatos-Trapezogrammation';

/* GET users listing. */
router.get('/', function(req, res, next) {
  var db = req.db;
  store(db, res);
});


function store(db){
  jsdom.env({
    url: site,
    scripts: ["http://code.jquery.com/jquery.js"],
    done: function (err, windowq){
          //Use jQuery just as in a regular HTML page
          var buy = windowq.$(".PinakasSynallagmatos tr:nth-child(23) .secondcell_1").text();
          var sell = windowq.$(".PinakasSynallagmatos tr:nth-child(23) .forthcell_1").text();

          var collection = db.get('usd');
          collection.insert({'date': new Date(), 'buy': parseFloat(buy), 'sell': parseFloat(sell)});
          res.json({'status': 'OK'});
        }
    });
}

module.exports = router;
