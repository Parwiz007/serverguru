var path = require("path");
// var db = require("../models/");
var controller = require("../controller/controller.js");
module.exports = function (app) {

    //Use Handlebars beyond this point
    app.get("/", function (req, res) {
        return res.render("index");
    });
    app.get("/:product", (req, res) => {
        var product = req.params.product;
        console.log(product);
        controller.getDataFromDB(function (data) {
            console.log(data);
            res.render("table", {
                result: {
                    data: data,
                    source: product}
            });
        },product)
    });
    app.get("/single/:source/:id", (req, res) => {
        console.log("single",req.params.id, req.params.source);
        var data;
        if (req.params.source === "aws"){
            controller.getAWSfromDB((returndata)=>{
                data = returndata;
                res.render("site", {
                    result: data
                })
            },req.params.id)
        }
    });
}