const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const sql = require("./db/db");
require("./db/CreateDB")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "static")));
app.set("view engine", "ejs");

//controllers
const UserController = require("./controllers/UserController.js");
const ParkController = require("./controllers/ParkController.js");

//homepage route
app.get("/", (req, res) => {
  res.render("homepage");
});

// user routes
app.get("/signIn", UserController.RenderSignInPage);
app.get("/signUp", UserController.RenderSignUpPage);
app.post("/signUp", UserController.SignUpUser);
app.post("/signIn", UserController.SignInUser);
app.get("/getLocation", UserController.RenderGetUserLocationPage);

//park routes
app.post("/searchParks", ParkController.GetClosestParks);
app.get("/parks", ParkController.RenderParksResultPage);

app.get("/forgetPassword", (req, res) => {
  res.render("forgetUrPassword");
});


app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});

//app.get("/init",createDB.CreateTables );
