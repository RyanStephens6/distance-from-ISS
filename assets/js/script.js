var addressLink =
  "https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=76f8a5221fbe49a7b156d4fddcaeeaad";
var issLink = "http://api.open-notify.org/iss-now.json";

var issData = fetch(issLink, {
  cache: "reload",
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    return data;
  });

var addressData = fetch(addressLink, {
  cache: "reload",
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    return data;
  });

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
  visibilityText.innerText = visibility;
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
console.log(issData);
console.log(addressData);
