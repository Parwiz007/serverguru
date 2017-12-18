var logger = require("../controller/logger");
var path = require("path");
var controller = require("../controller/controller.js");

module.exports = function (app) {

    app.get("/api/updatedata", (req, res) => {
        logger("api-routes", "api/updatedata");

        controller.getCFdata((data) => {})
        controller.getAWSdata((data) => {});
        res.send(Date().toString());
    });
    app.get("/api/nightmare", (req, res) => {
        logger("api-routes", "nightmare", "");
        controller.getNightmares((result) => {
            res.send(result);
        });
    })
    app.get("/api/images/:domain",(req,res)=>{
        logger("api-routes","/api/images/:domain",req.params.domain);
        controller.getImages(req.params.domain,(data)=>{
            console.log(data);
            res.send(data)
        })
    })
    app.get("/api/:id", (req, res) => {
        var id = req.params.id;
            logger("api-routes", "api/:id", id);
            
            controller.getDataFromDB((result) => {
                res.send(result);
            },undefined,id);
    })

}