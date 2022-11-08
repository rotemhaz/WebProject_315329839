var i = 0;
var text = "Is it okay to use your geolocation?";
var speed = 50;

function Typing() {
  if (i < text.length) {
    document.getElementById("page5").innerHTML += text.charAt(i);
    i++;
    setTimeout(Typing, speed);
  }
}

function wantSeeMore() {
  var x = document.getElementById("seeMore");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function GetLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const res = await fetch(`http://localhost:3000/searchParks`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          parkSize: document.getElementById("park-size").value,
        }), // body data type must match "Content-Type" header
      });
      const html = await res.text();

      document.open();
      document.write(html);
      document.close();
    });
  } else {
    document.getElementById("p").innerHTML = "Geolocation is not supported";
  }
}

function showPosition(position) {
  var x = document.getElementById("p");
  var y = document.getElementById("button");
  x.innerHTML = "your in" + "<br/>" + position.coords.latitude;
}
