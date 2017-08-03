// set dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// set Express
var app = express();
// set port (process.env.PORT if live/3000 if localhost)
var port = process.env.PORT || 3000;

// set data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// set absolute pathing
app.use(express.static(__dirname + '/app/public'));

// set array of friends
var friends = [];

// set routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

// get API friends list
app.get("/api/friends", function(req, res) {
  res.json(friends);
});

// post to send data to the object array
app.post("/api/friends", function(req, res) {

	//if(tables.length < 5){
  		friends.push(req.body);
  		//res.send(true);
  	//} else {
  	//	waitList.push(req.body);
  	//	res.send(false);
  	//}
  res.json(friends);
});

// start server listener
  app.listen(port, function() {
  console.log("App listening on PORT " + port);
});