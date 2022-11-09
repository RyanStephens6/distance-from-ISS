// $(document).ready(function () {

//   $(".submitBtn").on("click", function () {
//         var myLocation = ;
//         var issLocation = ;
//         localStorage.setItem(myLocation, issLocation);
//   });

//   for (i=0; i < 5; i++) {
//     var li = document.createElement("li");
//     var locations = localStorage.getItem("myLocation", "issLocation");
//     li.appendChild(locations);
//     document.getElementById("userSaved").appendChild(li);
//   }
// });

var addressLink = "https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=76f8a5221fbe49a7b156d4fddcaeeaad";
var issLink = "http://api.open-notify.org/iss-now.json"

var issData = fetch(issLink, {
    cache: "reload"
})
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        return data;
    })

var addressData = fetch(addressLink, {
    cache: "reload"
})
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        return data;
    })

console.log(issData);
console.log(addressData);

