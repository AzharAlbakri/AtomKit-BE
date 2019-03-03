const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("../database/index");
const PORT = process.env.PORT || 5000;

const app = express();

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, "../client/public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


let subject = db.collection("Subject");
let teacher = db.collection("Teacher");
let course = db.collection("Course");

///////////////////////////////////////////////////////////////////////////////////////
////                                     Get data                                  ////                          
///////////////////////////////////////////////////////////////////////////////////////
app.get("/subject", function(req, res) {
    console.log("entered in")
    db.Sub
      .find({}, { projection: { _id: 0 } })
      .toArray(function(error, data) {
        res.send(data);
      });
  });


///////////////////////////////////////////////////////////////////////////////////////
////                                     POST data                                  ////                          
///////////////////////////////////////////////////////////////////////////////////////
app.post("/addsubject", function(req, res) {
    console.log('enterd here');
    
    db.saveSub(req.body, function(done, err) {
      if (err) {
        throw err;
      }
      console.log("saved sub");
      res.send("done");
    });
  });


// All remaining requests return the React app, so it can handle routing.
app.get("*", function(request, response) {
    response.sendFile(path.resolve(__dirname, "../client/public", "index.html"));
  });
  
  app.listen(PORT, function() {
    console.error(
      `Node cluster worker ${process.pid}: listening on port ${PORT}`
    );
  });
  
/////////////////////////////////////////////////////////////////////////
/////                          working                                ///
/////////////////////////////////////////////////////////////////////////

// const express = require("express");
// const bodyParser = require("body-parser");
// const path = require("path");
// const PORT = process.env.PORT || 5000;
// // var request = require("request");

// const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(express.static("public"));


// // Answer API requests.
// const mongoose = require("mongoose");
// mongoose.connect(
//   "mongodb://admin:admin12345678@ds155045.mlab.com:55045/atomkit",
//   { useNewUrlParser: true }
// );

// const db = mongoose.connection;
// db.on("error", function() {
//   console.log("mongoose connection error");
// });

// db.once("open", function() {
//   console.log("mongoose connected successfully");
// });

// let Subject = db.collection("subject");
// let Teacher = db.collection("teacher");
// let Course = db.collection("course");


// //Get data
// //subject API
// app.get("/subject", function(req, res) {
//     Subject
//     .find({}, { projection: { _id: 0 } })
//     .toArray(function(error, data) {
//       res.send(data);
//     });
// });

// //Get data
// //Teacher API
// app.get("/teacher", function(req, res) {
//     Teacher
//     .find({}, { projection: { _id: 0 } })
//     .toArray(function(error, data) {
//       res.send(data);
//     });
// });

// //Get data
// //Course API
// app.get("/course", function(req, res) {
//     Course
//     .find({}, { projection: { _id: 0 } })
//     .toArray(function(error, data) {
//       res.send(data);
//     });
// });


// //Listen to port
// app.listen(PORT, function() {
//   console.error(
//     `Node cluster worker ${process.pid}: listening on port ${PORT}`
//   );
// });