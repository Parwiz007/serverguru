var logger = require("../controller/logger");
var db = require("../models");
var Nightmare = require('nightmare');
var vo = require('vo');

module.exports = (urls) => {
    var titles = [];


    var run = function* () {
        for (var i = 0; i < urls.length; i++) {
            nightmare = Nightmare({
                show: false,
                gotoTimeout: 5000,
                waitTimeout: 1000
            });
            fileName = urls[i] + "-" + (new Date).getTime() + '.png';
            console.log(urls[i]);
            var title = yield nightmare
                .goto("https://" + urls[i])
                // .wait('body')
                .screenshot(__dirname + "/../public/assets/img/" + fileName)
                .then(() => {
                    db.nmimages.create({
                        domain: urls[i],
                        filename: fileName
                    }).then(() => {
                        console.log("createdEntry for ", urls[i]);
                    });
                    // if (i === urls.length - 1) {
                        
                    //     return urls;
                    // }
                    nightmare.halt();
                })
                .catch((error)=>{
                    console.log(error);
                    nightmare.halt();
                });
        }
    }

    vo(run)(function (err, titles) {
        console.log("**" + titles);
    })
}