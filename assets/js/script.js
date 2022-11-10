async function getIssCoordinates(issUrl) {
  let response = await fetch(issUrl);
  let data = await response.json();
  let issCoordinates = document.getElementById("iss-coordinates");
  issCoordinates.textContent =
    data.iss_position.latitude + " " + data.iss_position.longitude;
}

async function getAddressCoordinates(addressUrl) {

    let response = await fetch(addressUrl);
    let data = await response.json();
    let addressCoordinates = document.getElementById("address-coordinates");
    addressCoordinates.textContent = data.features[0].bbox[1] + " " + data.features[0].bbox[0];

}

getIssCoordinates("http://api.open-notify.org/iss-now.json");
getAddressCoordinates(
  "https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=76f8a5221fbe49a7b156d4fddcaeeaad"
);

function getDistance(x1, y1, x2, y2) {
  let y = x2 - x1;
  let x = y2 - y1;

  return Math.sqrt(x * x + y * y);
}
