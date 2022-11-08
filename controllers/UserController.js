const sql = require("../db/db");
// enter to the app
const SignInUser = (req, res) => {
  const { userName, password } = req.body;
  sql.query(
    `select * FROM users where userName="${userName}" and password="${password}"`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else if (data[0]) {
        // go to "get location" page
        res.redirect("/getLocation");
      } else {
        res.redirect("/signUp");
      }
    }
  );
};

const SignUpUser = (req, res) => {
  const { userName, password, phoneNumber, dogAge, dogType, weight } = req.body;
  //insert user to db
  console.log(userName, password, phoneNumber, dogAge, dogType, weight);
  const insertUserQ = "INSERT INTO users SET ?";
  const newUser = {
    userName: userName,
    password: password,
    phone: phoneNumber,
  };
  sql.query(insertUserQ, newUser, (err) => {
    if (err) {
      console.log("error in inserting data", err);
    }
  //insert dog to db
    const newDog = {
      type: dogType,
      age: dogAge,
      weight: weight,
    };
    sql.query("INSERT INTO dogs SET ?", newDog, (err) => {
      if (err) {
        console.log("error in inserting data", err);
      }
    });
    res.render("getLocation");
  });
};

const RenderSignInPage = (req, res) => res.render("signIn");
const RenderSignUpPage = (req, res) => res.render("signUp");
const RenderGetUserLocationPage = (req, res) => res.render("getLocation");

module.exports = {
  SignInUser,
  SignUpUser,
  RenderSignInPage,
  RenderSignUpPage,
  RenderGetUserLocationPage,
};
