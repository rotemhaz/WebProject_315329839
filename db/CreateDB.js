var SQL = require("./db");
const path = require("path");
const csv = require("csvtojson");

//fuction that create the tables in the db
const CreateTables = () => {
  var Q1 =
    "CREATE TABLE users (userName VARCHAR(255), password VARCHAR(255), phone VARCHAR(255))";
  SQL.query(Q1, (err, mySQLres) => {
    if (err) {
      console.log("error ", err);
      return;
    }
    console.log("created table");
    return;
  });

  var Q2 =
    "CREATE TABLE dogs (userId INT NOT NULL AUTO_INCREMENT, type VARCHAR(255), age INT, weight INT,PRIMARY KEY (userId) )";
  SQL.query(Q2, (err, mySQLres) => {
    if (err) {
      console.log("error ", err);
      return;
    }
    console.log("created table");
    return;
  });

  var Q3 =
    "CREATE TABLE parks (name VARCHAR(255), city VARCHAR(255), lat FLOAT, lon FLOAT, park_size VARCHAR(255) )";
  SQL.query(Q3, (err, mySQLres) => {
    if (err) {
      console.log("error ", err);
      return;
    }
    console.log("created table");
  });
};

//fuction that insert the initial data to the db
const InsertData = () => {
  var insertUserQ = "INSERT INTO users SET ?";
  const userCsvFilePath = path.join(__dirname, "/mock/users.csv");
  csv()
    .fromFile(userCsvFilePath)
    .then((jsonObj) => {
      console.log(jsonObj);
      jsonObj.forEach((element) => {
        var newUser = {
          userName: element.userName,
          password: element.password,
          phone: element.phone,
        };
        SQL.query(insertUserQ, newUser, (err, mysqlres) => {
          if (err) {
            console.log("error in inserting data", err);
          }
        });
      });
    });

  var Q2 = "INSERT INTO parks SET ?";
  const parksCsvFilePath = path.join(__dirname, "/mock/parks.csv");
  csv()
    .fromFile(parksCsvFilePath)
    .then((jsonObj) => {
      console.log(jsonObj);
      jsonObj.forEach((element) => {
        var newParks = {
          Name: element.Name,
          city: element.city,
          lat: element.lat,
          lon: element.lon,
          park_size: element.park_size,
        };
        SQL.query(Q2, newParks, (err, mysqlres) => {
          if (err) {
            console.log("error in inserting data", err);
          }
        });
      });
    });

  const dogsCsvFilePath = path.join(__dirname, "/mock/dogs.csv");
  csv()
    .fromFile(dogsCsvFilePath)
    .then((jsonObj) => {
      console.log(jsonObj);
      jsonObj.forEach((element) => {
        var newDog = {
          userId: element.UserId,
          type: element.type,
          age: element.age,
          weight: element.weight,
        };
        SQL.query("INSERT INTO dogs SET ?", newDog, (err, mysqlres) => {
          if (err) {
            console.log("error in inserting data", err);
          }
        });
      });
    });
};


// function that show all the data in the table
const ShowTable = () => {
  var Q3 = "SELECT * FROM users";
  SQL.query(Q3, (err, mySQLres) => {
    if (err) {
      console.log("error in showing table ", err);
      return;
    }
    console.log("showing table");
  });
};


//function that drop the tables
const DropTable = () => {
  SQL.query("DROP TABLE users", (err, mySQLres) => {
    if (err) {
      console.log("error in droping table ", err);
    } else {
      console.log("table drpped");
    }
  });

  SQL.query("DROP TABLE dogs", (err, mySQLres) => {
    if (err) {
      console.log("error in droping table ", err);
    } else {
      console.log("table drpped");
    }
  });

  SQL.query("DROP TABLE parks", (err, mySQLres) => {
    if (err) {
      console.log("error in droping table ", err);
    } else {
      console.log("table drpped");
    }
  });
};

const init = () => {
  DropTable();
  CreateTables();
  InsertData();
  ShowTable();
};

init();
