/* Corine Jacobs
   10001326
   Universiteit van Amsterdam
   Corine_J@MSN.com */

var theimage = document.getElementById('theimage');
var deg = 0;

function makeRotationCW(){
	if (deg == 0 || deg == 90 || deg == 180 || deg == 270){
		deg += 90;
		console.log("add 90 --" + deg);
	}
	else{
		console.log("Something went wrong in the calculation of the rotation degree. This should never happen.")
	}

	if (deg == 360){
		deg = 0;
		console.log("back to 0  --" + deg);
	}

	theimage.style.WebkitTransform = "rotate("+ deg + "deg)";
}

function makeRotationCCW(){
	if (deg == 0 || deg == 90 || deg == 180 || deg == 270){
		deg -= 90;
		if (deg == -90){
			deg = 270;
		}
		console.log("subtract 90 --" + deg);
	}
	else{
		console.log("Something went wrong in the calculation of the rotation degree. This should never happen.")
	}

	theimage.style.WebkitTransform = "rotate("+ deg + "deg)";
}

function makeGuess(){
	if (deg == 0){
		// the user was right
		window.alert("You were right!");
	}
	else{
		// the user was wrong
		window.alert("You were wrong :( ...");
	}
}