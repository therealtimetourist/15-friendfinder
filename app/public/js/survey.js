// Chosen CSS
var config = {
  '.chosen-select'           : {disable_search:true},
  '.chosen-select-deselect'  : {allow_single_deselect:true},
  '.chosen-select-no-single' : {disable_search_threshold:2},
  '.chosen-select-no-results': {no_results_text:'Results not found!'},
  '.chosen-select-width'     : {width:"95%"}
}
for (var selector in config) {
  $(selector).chosen(config[selector]);
}

// Capture the form inputs 
$("#submit").on("click", function(){
	// Form validation
	function validateForm() {
	  var isValid = true;
	  $('.form-control').each(function() {
	    if ( $(this).val() === '' )
	        isValid = false;
	  });

	  $('.chosen-select').each(function() {

	  	if( $(this).val() === "")
	  		isValid = false
	  })
	  return isValid;
	}

	// If all required fields are filled
	if (validateForm() == true){
		// Create an object for the user's data
    	var userData = {
    		name: $("#name").val(),
    		photo: $("#photo").val(),
    		scores: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val(), $("#q6").val(), $("#q7").val(), $("#q8").val(), $("#q9").val(), $("#q10").val(), ]
    	}

    	// Grab the URL of the website
    	var currentURL = window.location.origin;

    	// AJAX post data to friends API. 
    	$.post(currentURL + "./api/friends", userData, function(data){
    		var friendMatch = getFriendMatch(data);
    		//console.log("survey.data: " + data);
    		// get result from AJAX post with best match name/photo
    		$("#matchName").text(friendMatch[0].name);
    		$('#matchImg').attr("src", friendMatch[0].photo);

	    	// Show the modal with the best match 
	    	$("#resultsModal").modal('toggle');

    	});
	} else{
		alert("Please fill out all fields before submitting!");
	}
	return false;
});

function getFriendMatch(data){
	//var friendName = "";
	//var friendPhoto = "";
	var userToMatch = [];
	//var lowestScore = 0;
	// get last user to enter data's scores
	for (var i = 0; i < 10; i++){
		userToMatch.push(parseInt(data[data.length-1].scores[i]));
	}
	
	// loop through  all users except for last user entered (userToMatch)
	for(var i = 0; i < (data.length - 1); i++){
		// set a datascore variable
		var datascore = 0;
		// loop through scores for each user
		for (var j = 0; j < 10 ; j++){
			// compare all users scores to last user entered (userToMatch)
			// add up scores
			datascore += Math.abs( userToMatch[j] - data[i].scores[j] );
		}
		console.log("datascore " + i + ": " + datascore);
		// add a key/value to the object for the score
		data[i].differenceScore = datascore;
	}

	 // There's no real number bigger than plus Infinity
	var lowest = Number.POSITIVE_INFINITY;
	var tmp;
	var recNum;
	for (var i = data.length - 1; i >= 0; i--) {
	    tmp = data[i].differenceScore;
	    if (tmp < lowest){
	    	lowest = tmp;
	    	recNum = i;
	    } 
	}

	var a = [{"name": data[recNum].name, "photo": data[recNum].photo}];
	return a;
}