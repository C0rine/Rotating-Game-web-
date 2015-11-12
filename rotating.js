/* Corine Jacobs
   10001326
   Universiteit van Amsterdam
   Corine_J@MSN.com */

var theimage = document.getElementById('theimage');
var deg = 0;
var imagesobject;
var imagesobjectlength;
var images = [];

var europeana = "http://www.europeana.eu/api/v2/search.json?wskey=gch8JXkXX&query=van+gogh&start=1&rows=24&profile=standard"
var myRequest = new XMLHttpRequest();


myRequest.onreadystatechange = function() {
 	if (myRequest.readyState == 4 && myRequest.status == 200) {
        getArray(myRequest.responseText);
    }
};

myRequest.open("GET", europeana, true);
myRequest.send();

function getArray(response){
	
	itemsobject = JSON.parse(response);
	imagesobjectlength = itemsobject.itemsCount;
	for (i=0; i<imagesobjectlength; i++){
	 	//images.push(imagesobject.items[i].edmPreview[0]);
		images.push(itemsobject.items[i].edmPreview[0]);
	}
	console.log(images);
}

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
		// automatically move the next image
		nextImage();
	}
	else{
		// the user was wrong
		window.alert("You were wrong :( ...");
	}
}

function nextImage(){
	var current = images.indexOf(theimage.src);
	var next = current + 1;

	// wrap around the length of the array
	if (images.length > next){
		theimage.src = images[next];
	}
	else {
		theimage.src = images[0];
	}
}