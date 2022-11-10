var submitButton = document.getElementById("submitBtn");
var x
var y

//This function uses a web API to grab the coordinates of the ISS in real time and store them in an HTML element
async function getIssCoordinates(issUrl) {
  let response = await fetch(issUrl);
  let data = await response.json();
  let issCoordinates = document.getElementById("iss-coordinates");
  issCoordinates.textContent =
    data.iss_position.latitude + " " + data.iss_position.longitude;
}

//This function uses a web API to grab the coordinates of an address
async function getAddressCoordinates(addressUrl) {
  let response = await fetch(addressUrl);
  let data = await response.json();
  let addressCoordinates = document.getElementById("address-coordinates");
  addressCoordinates.textContent =
    data.features[0].bbox[1] + " " + data.features[0].bbox[0];
}

getIssCoordinates("http://api.open-notify.org/iss-now.json");

//This function takes the address the user input into the submit form and calls the getAddressCoordinates function to find the coordinates of said address. It will also call updateDistanceContainer to display the distance between the ISS and the user address
function handleSubmitButton() {
    var userInput = document.getElementById("address").value;
    var userInputArray = userInput.split(' ');
    var addressUrl = "https://api.geoapify.com/v1/geocode/search?text="
    for(let i=0; i<userInputArray.length; i++) {
        if(i === 0) {
            addressUrl += userInputArray[i];
            continue;
        }
        addressUrl += "%20" + userInputArray[i];
    }
    addressUrl += "&apiKey=76f8a5221fbe49a7b156d4fddcaeeaad";
    getAddressCoordinates(addressUrl);

    var unitSelector = document.getElementsByName("measurement-unit")
    for(let i=0; i < unitSelector.length; i++){
        if(unitSelector[i].checked == true){
            var unitOfMeasurement = unitSelector[i].value
        }
    }
    updateDistanceContainer(unitOfMeasurement);
}

//This function calculates the distance between two sets of coordinates
//(x1, y1) = (latitude, longitude) ISS coordinates and home address can be interchanged
// function getDistance(x1, y1, x2, y2) {
//   let y = x2 - x1;
//   let x = y2 - y1;

//   return Math.sqrt(x * x + y * y);
// }


// nedd to designat the varribles for long, and latt
function getDistance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="Kilometers") { dist = dist * 1.609344 }
		if (unit=="Football fields") { dist = dist * 0.8684 }
		return dist;
	}
}
//This function updates the distance displayed to the user
function updateDistanceContainer(unitOfMeasurement) {
    var issCoordinates = document.getElementById("iss-coordinates").textContent;
    var issArr = issCoordinates.split(' ');
    var issX = issArr[0];
    var issY = issArr[1];
    
    var addressCoordinates = document.getElementById("address-coordinates").textContent;
    var addressArr = addressCoordinates.split(' ');
    var addressX = addressArr[0];
    var addressY = addressArr[1];

    var distance = getDistance(issX, issY, addressX, addressY, unitOfMeasurement);
    document.getElementById("distance").value = distance.toFixed(2) + " " + unitOfMeasurement;
}

//Event listner for form
submitButton.addEventListener("click", handleSubmitButton);

//Current day for header
function clock() {
  var date = dayjs().format("MMMM D");
  var time = dayjs().format("h:mm:ssa");
  $(currentDate).text(date + ", " + time);
}

setInterval(clock, 1000);
