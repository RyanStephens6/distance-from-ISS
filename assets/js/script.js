let latitudeText = document.querySelector(".latitude");
let longitudeText = document.querySelector(".longitude");
let timeText = document.querySelector(".time");
let speedText = document.querySelector(".speed");
let altitudeText = document.querySelector(".altitude");
let visibilityText = document.querySelector(".visibility");
let lat = 51.505;
let long = -0.09;
let zoomLevel = 8;

const map = L.map("map-div").setView([lat, long], zoomLevel);
L.tileLayer("").addTo(map);
function updateISS(lat, long, timestamp, speed, altitude, visibility) {
  // updates Marker's lat and long on map
  marker.setLatLng([lat, long]);
  // updates map view according to Marker's new position
  map.setView([lat, long]);
  // updates other element's value
  latitudeText.innerText = lat;
  longitudeText.innerText = long;
  timeText.innerText = timestamp;
  speedText.innerText = `${speed} km/hr`;
  altitudeText.innerText = `${altitude} km`;
}
function findISS() {
  fetch(
    "https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=76f8a5221fbe49a7b156d4fddcaeeaad"
  )
    .then((response) => response.json())
    .then((data) => {
      lat = data.latitude.toFixed(2);
      long = data.longitude.toFixed(2);
      // convert seconds to milliseconds, then to UTC format
      const timestamp = new Date(data.timestamp * 1000).toUTCString();
      const speed = data.velocity.toFixed(2);
      const altitude = data.altitude.toFixed(2);
      const visibility = data.visibility;
      // call updateISS() function to update things
      updateISS(lat, long, timestamp, speed, altitude, visibility);
    })
    .catch((e) => console.log(e));
}

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiaDRkM3MiLCJhIjoiY2xhYmVwNHIwMGgyMzNvbnQ0b2M1N2t0diJ9.kq5856BKFbWZ8zaKqbEPrA",
  }
).addTo(map);
const icon = L.icon({
  iconUrl: "./images/12860544.jpg",
  iconSize: [90, 45],
  iconAnchor: [25, 94],
  popupAnchor: [20, -86],
});
const marker = L.marker([lat, long], { icon: icon }).addTo(map);
function findISS() {
  fetch("https://api.wheretheiss.at/v1/satellites/25544")
    .then((response) => response.json())
    .then((data) => {
      lat = data.latitude.toFixed(2);
      long = data.longitude.toFixed(2);
      // convert seconds to milliseconds, then to UTC format
      const timestamp = new Date(data.timestamp * 1000).toUTCString();
      const speed = data.velocity.toFixed(2);
      const altitude = data.altitude.toFixed(2);
      const visibility = data.visibility;
      // call updateISS() function to update things
      updateISS(lat, long, timestamp, speed, altitude, visibility);
    })
    .catch((e) => console.log(e));
}

findISS();
setInterval(findISS, 2000);
var submitButton = document.getElementById("submitBtn");
var x;
var y;
var string = [];

//Address map
const map2 = L.map("address-map").setView([lat, long], zoomLevel);
L.tileLayer("").addTo(map2);
L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiaDRkM3MiLCJhIjoiY2xhYmVwNHIwMGgyMzNvbnQ0b2M1N2t0diJ9.kq5856BKFbWZ8zaKqbEPrA",
    }
  ).addTo(map2);
  const icon2 = L.icon({
    iconUrl: "./images/wireframe.png",
    iconSize: [90, 45],
    iconAnchor: [25, 94],
    popupAnchor: [20, -86],
  });
  

function updateAddress(lat, long) {
    // updates Marker's lat and long on map
    marker.setLatLng([lat, long]);
    // updates map view according to Marker's new position
    map2.setView([lat, long]);
    L.marker([lat, long], { icon: icon2 }).addTo(map2);
}

//This function uses a web API to grab the coordinates of the ISS in real time and store them in an HTML element
async function getIssCoordinates(issUrl) {
  let response = await fetch(issUrl);
  let data = await response.json();
  let issCoordinates = document.getElementById("iss-coordinates");
  issCoordinates.textContent = data.latitude + " " + data.longitude;
}

getIssCoordinates("https://api.wheretheiss.at/v1/satellites/25544");

//This function takes the address the user input into the submit form and calls the getAddressCoordinates function to find the coordinates of said address. It will also call updateDistanceContainer to display the distance between the ISS and the user address
function handleSubmitButton() {
    //Handles user address input
  var userInput = document.getElementById("address").value;
  var userInputArray = userInput.split(" ");
  var addressUrl = "https://api.geoapify.com/v1/geocode/search?text=";
  for (let i = 0; i < userInputArray.length; i++) {
    if (i === 0) {
      addressUrl += userInputArray[i];
      continue;
    }
    addressUrl += "%20" + userInputArray[i];
  }
  addressUrl += "&apiKey=76f8a5221fbe49a7b156d4fddcaeeaad";
  fetch(addressUrl)
  .then((response) => response.json())
    .then((data) => {
        let latitude = data.features[0].bbox[1];
        let longitude = data.features[0].bbox[0];
        document.querySelector(".addressLat").textContent = latitude;
        document.querySelector(".addressLong").textContent = longitude;
        updateAddress(latitude, longitude);
        var unitSelector = document.getElementsByName("measurement-unit");
        for (let i = 0; i < unitSelector.length; i++) {
            if (unitSelector[i].checked == true) {
                var unitOfMeasurement = unitSelector[i].value;
            }
        }
        updateDistanceContainer(unitOfMeasurement);
    })
}

// need to designate the variables for long, and latt
function getDistance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "Kilometers") {
      dist = dist * 1.609344;
    }
    if (unit == "Football fields") {
      dist = dist * 17.6;
    }
    return dist;
  }
}
//This function updates the distance displayed to the user
function updateDistanceContainer(unitOfMeasurement) {
    //Grab coordinates to ISS
  var issCoordinates = document.getElementById("iss-coordinates").textContent;
  var issArr = issCoordinates.split(" ");
  var issLatitude = issArr[0];
  var issLongitude = issArr[1];

  //Grabs coordinates to the user inputted address
  var addressLatitude = document.querySelector(".addressLat").textContent;
  var addressLongitude = document.querySelector(".addressLong").textContent;
  console.log(addressLongitude);

  //Calls function to calculate distance and updates the distance displayed to the user
  var distance = getDistance(issLatitude, issLongitude, addressLatitude, addressLongitude, unitOfMeasurement);
  document.getElementById("distance").value = distance.toFixed(2) + " " + unitOfMeasurement;

  var previousSession = JSON.parse(localStorage.getItem("address")) || [];
  var now = dayjs().format('HH:mm on MM DD YYYY');
  var userInput = document.getElementById("address").value;
  if (previousSession !== null) {
    previousSession.push({"input": userInput, "location": distance, "unit": unitOfMeasurement, "time": now});
  } else {
    previousSession = {"input": userInput, "location": distance, "unit": unitOfMeasurement, "time": now}
  }
  localStorage.setItem("address", JSON.stringify(previousSession));
}

//Event listner for form
submitButton.addEventListener("click", handleSubmitButton);

//Current day for header
function clock() {
  var date = dayjs().format("MMMM D");
  var time = dayjs().format("h:mm:ssa");
  $(currentDate).text(date + ", " + time);
}

function savedLocations() {
  var list = document.getElementById("userSaved");
  var saved = JSON.parse(localStorage.getItem("address")) || [];
  for (var i = 0; i < saved.length; i++) {
    if (saved[i] === undefined) {
    return
    }
    var listItem = document.createElement("li");
    listItem.appendChild(document.createTextNode(saved[i].input + " was " + saved[i].location + " " + saved[i].unit + " away from the ISS at " + saved[i].time));
    list.appendChild(listItem);
  }
}

setInterval(clock, 1000);

savedLocations();