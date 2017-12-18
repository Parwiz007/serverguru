var cfAPI = require("./cloudflare-api.js");
var awsAPI = require("./aws-api.js");
var logger = require("./logger");
var db = require("../models/");
var nightmare = require("./nightmare");


var controller = {
        getDataFromDB: (callback, product, id) => {
            /*  This returns any data from records table in local DB
                At the time, the record data includes aws and cloudflare
            */
            var query = {
                raw: true
            }
            query.where = {}
            if (typeof product !== "undefined") {
                query.where.product = product;
            }
            if (typeof id !== "undefined") {
                query.where.id = id;
            }
            logger("controller", "getDataFromDB", JSON.stringify(query));
            db.records.findAll(query).then(data => {
                callback(data);
            })
        },
        getCFdata: function (callback) {
            //  This fetches data from Cloudflare API
            cfAPI(function (data) {
                logger("controller", "getCFdata", "rows returned by API=" + data.length);
                data.map((y) => {
                    db.records.findOrCreate({
                        where: {
                            id: y.id
                        },
                        defaults: {
                            name: y.name,
                            product: "cloudflare",
                            type: y.type,
                            value: y.value
                        }
                    }).spread(function (user, created) {
                        callback(user);
                    });
                });
            });
        },
        getAWSdata: function (callback) {
            //  This fetches data from AWS Api
            awsAPI(function (data) {
                logger("controller", "getAWSdata", "rows returned by API=" + data.length);
                data.map((y) => {
                    db.records.findOrCreate({
                        where: {
                            id: y.id
                        },
                        defaults: {
                            name: y.name,
                            product: "aws",
                            type: y.type,
                            value: y.value,
                            tags: y.tags
                        }
                    }).spread(function (user, created) {
                        callback(user);
                    });
                });
            });
        },
        getDomainData: (domainID, callback) => {
            result = {};
            result.domainID = domainID;
            db.records.findAll({
                where: {
                    product: "cloudflare",
                    id: domainID
                }
            }).then(data => {
                // console.log(data);
                result.domain = data[0].name;
            }).then(() => {
                db.nmimages.findAll({
                    limit: 2,
                    where: {
                        domain: result.domain
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                }).then(function (entries) {
                    result.images = entries;
                    callback(result);
                });
            })
        },
        getImages: (domain, callback) => {
            var query = {
                limit: 2
            };
            query.order = [['id','DESC']];
            query.where = {
                domain: domain
            };
            logger("controller", "getImages", JSON.stringify(query));
            db.nmimages.findAll(query)
                .then(result => {
                    callback(result)
                })
        },
        getNightmares: (callback) => {
            // var sites1 = [];
            // var sites2 = [];
            var sites = []
            var nm = true;
            db.records.findAll({
                    attributes: ['type', 'name']
                })
                .then(entries => {
                        entries.forEach((entry) => {
                                if (entry.type === "A" || entry.type === "CNAME") {
                                    sites.push(entry.name);
                                    // if (nm) {
                                    //     sites1.push(entry.name);
                                    //     nm = false;
                                    // } else if (!nm) {
                                    //     sites2.push(entry.name);
                                    //     nm = true;
                                    // }
                                }
                            })
                            // console.log(sites1, "---", sites2);
                            // nightmare(sites1);
                            // nightmare(sites2);
                            nightmare(sites);
                        });

                }
        }

        module.exports = controller;