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
app.use(express.static(__dirname + './app/public'));

// set array of friends. Information from survey form is appended
// with default data added
var friends = [
	{
		"name": "Don Bedwell",
		"photo": "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAq2AAAAJGZhMWQwOTY3LTAxZmQtNDg0Ny1hZjBjLTgyNjk2YWU0YzQxOA.jpg",
		"scores": [
			"5",
			"5",
			"3",
			"1",
			"3",
			"4",
			"5",
			"1",
			"3",
			"2"
			]
	},
	{
		"name": "Jeremy Johansen",
		"photo": "http://i.huffpost.com/gadgets/slideshows/10591/slide_10591_139838_large.jpg",
		"scores": [
			"4",
			"5",
			"1",
			"1",
			"1",
			"4",
			"3",
			"5",
			"2",
			"4"
		]
	},
	{
		"name": "Scooter Petersen",
		"photo": "http://www.teamjimmyjoe.com/wp-content/uploads/2015/09/awkward-family-photos-portrait-hawaiian-shirt.jpg",
		"scores": [
			"5",
			"5",
			"5",
			"5",
			"5",
			"5",
			"5",
			"5",
			"5",
			"5"
		]
	},
	{
		"name": "Mandy Ralston",
		"photo": "https://s-media-cache-ak0.pinimg.com/736x/cf/e7/e2/cfe7e2333d0f93b30d8e14ec8f98b502--family-pics-awkward-family-photos.jpg",
		"scores": [
			"3",
			"3",
			"3",
			"3",
			"3",
			"3",
			"3",
			"3",
			"3",
			"3"
		]
	}
];

// set routes
// index (home) page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./app/public/home.html"));
});
// survey page
app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "./app/public/survey.html"));
});
// get API friends list (the raw data)
app.get("/api/friends", function(req, res) {
  res.json(friends);
});
// post data to the object array
app.post("/api/friends", function(req, res) {
	friends.push(req.body);
	res.json(friends);
});

// start server listener
  app.listen(port, function() {
  console.log("App listening on PORT " + port);
});