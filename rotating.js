/* Corine Jacobs
   10001326
   Universiteit van Amsterdam
   Corine_J@MSN.com */

var theimage = document.getElementById('theimage');
var deg = 0;
var imagesobject;
var imagesobjectlength;
var images = [];

// Initiate request Europeana API
var europeana = "http://www.europeana.eu/api/v2/search.json?wskey=gch8JXkXX&query=van+gogh&start=1&rows=24&profile=standard"
var myRequest = new XMLHttpRequest();


myRequest.onreadystatechange = function() {
	// check if the request was succesful
 	if (myRequest.readyState == 4 && myRequest.status == 200) {
        // retrieve the images from the request and put them into an array
        getArray(myRequest.responseText);
		
		// set the image src for the first view	
		theimage.src = images[0];
		newdeg = getRandomRotation();
		theimage.style.WebkitTransform = "rotate("+ newdeg + "deg)";
		deg = newdeg;
    }
};

myRequest.open("GET", europeana, true);
myRequest.send();

// uses the response from the httprequest make an array of image urls
function getArray(response){
	
	itemsobject = JSON.parse(response);
	imagesobjectlength = itemsobject.itemsCount;
	for (i=0; i<imagesobjectlength; i++){
		// get the preview images and append them to the array 'images'
		images.push(itemsobject.items[i].edmPreview[0]);
	}
}

// give the image a rotation Clock Wise
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

// give the image a rotation Count Clock Wise
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

// check if the user was guessed correctly and gives appropriate feedback to user
function makeGuess(){
	if (deg == 0){
		// the user was right
		window.alert("You were right!");
		// automatically move the next image
		nextImage();
	}
	else{
		// the user was wrong
		window.alert("You were wrong :( ...");
	}
}

// cycle to the next image in the array and give it a random rotation
function nextImage(){
	var current = images.indexOf(theimage.src);
	var next = current + 1;

	// wrap around the length of the array
	if (images.length > next){
		theimage.src = images[next];
		// give the image a random rotation
		newdeg = getRandomRotation();
		theimage.style.WebkitTransform = "rotate("+ newdeg + "deg)";
		deg = newdeg;
	}
	else {
		theimage.src = images[0];
		// give the image a random rotation
		newdeg = getRandomRotation();
		theimage.style.WebkitTransform = "rotate("+ newdeg + "deg)";
		deg = newdeg;
	}
}

// return a random value of 0, 90, 180 or 270
function getRandomRotation(){
	var options = [0, 90, 180, 270];

	// get a random variable from the array 'options'
	var randomdeg = options[Math.floor(Math.random() * options.length)];

	return randomdeg;
}