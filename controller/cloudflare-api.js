var logger = require("./logger");
var fs = require('fs');
var path = require('path');
var cfAPI = require('cloudflare4');
var config = require(__dirname + '/../config/config.json')["cloudflare"];
var promises = [];
var cf = new cfAPI(config);

module.exports = (callback) => {
    cf.zoneGetAll().then((data) => {
        var result = [];
        data.map((x) => {
            cf.zoneDNSRecordGetAll(x.id).then((data) => {
                data.map((y) => {
                    result.push({
                        id: y.id,
                        name: y.name,
                        type: y.type,
                        value: y.content
                    });
                });
                logger("cloudflare-api", "zoneGetAll()", "Received count =>" + result.length);
                callback(result);
            });
        });

    }).catch((e) => {

    });
}