var bodyParser = require("body-parser");
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var session = require("express-session");
var routes = require("./routes");
var app = express();


mongoose.connect(process.env.MONGOLAB_URI, function (error){
   
   if (error) console.error(error);
   else console.logo("mongo connected")

});

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//app.set('view engine', 'pug');

//app.use('/public', express.static(path.join(__dirname + '/public')));
//app.use(express.static('public')
//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

app.listen(app.get("port"), function() {
  console.log("Server started on port " + app.get("port"));
});
