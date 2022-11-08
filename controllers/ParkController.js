const sql = require("../db/db");

//https://www.geeksforgeeks.org/program-distance-two-points-earth/
function distance(lat1, lat2, lon1, lon2) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;

  // calculate the result
  return c * r * 1000;
}


// function that get the closest park for the geolocation
const GetClosestParks = (req, res) => {
  const { latitude, longitude, parkSize } = req.body;
  console.log(latitude, longitude, parkSize);

  sql.query(
    "SELECT * FROM parks WHERE park_size = ?",
    [parkSize],
    (err, parks) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error");
        return;
      }
      for (const park of parks) {
        park.distance = distance(park.lat, latitude, park.lon, longitude);
      }
      console.log(parks);
      res.render("parksResult", { data: { parks } });
    }
  );
};

const RenderParksResultPage = (req, res) => {
  res.render("parksResult");
};

module.exports = {
  GetClosestParks,
  RenderParksResultPage,
};
