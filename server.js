var express = require("express");
var bodyParser = require("body-parser");

try {
  console.log("trying Cron");
  require('./controller/scheduler')();
} catch (error) {
  console.log(error);
}

var port = process.env.PORT || 8080;
var app = express();

//Tells express to serve anything on the public folder
app.use(express.static("public"));

//Parses body of incoming request see https://github.com/expressjs/body-parser#bodyparserurlencodedoptions
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

/*
Tell express to use handlebars when called. this is done by using app.render
Note that handlebars requires a specific folder structure /views/layouts/
the /views/ folder serves the pages being render
the /views/layouts folder serves the parent folder
*/
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// This is where the programs starts
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});