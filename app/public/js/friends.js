function goMakeFriends(){
	// root page
	var currentURL = window.location.origin;

	// AJAX function uses the API URL to GET data associated with it
	$.ajax({url: currentURL + "/api/friends", method: "GET"})
		.done(function(friendData) {
			// Here we are logging the URL so we have access to it for troubleshooting
			//console.log("------------------------------------");
			//console.log("URL: " + currentURL + "/api/friends");
			//console.log("------------------------------------");

			// Here we then log the NYTData to console, where it will show up as an object.
			//console.log(friendData);
			//console.log("------------------------------------")

			// Loop through and display each of the customers
			for (var i = 0; i < friendData.length; i++){

			// Create the HTML Well (Section) and Add the table content for each reserved table
			var friendsSection = $("<div>");
			friendsSection.addClass('well');
			friendsSection.attr('id', 'friendsWell-' + i+1)
			$('#friendsSection').append(friendsSection);


			// Then display the remaining fields in the HTML (Section Name, Date, URL)
			$("#friendsWell-"+ i+1).append('<h2><span class="label label-primary">' + tableNumber + "</span> | " + tableData[i].customerID + "</h2>");
		}
	});
}

goMakeFriends();