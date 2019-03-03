const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");
const PORT = process.env.PORT || 5000;
const mongoose = require("mongoose");
//mongoose.connect('mongodb://localhost/test');
mongoose.connect(
  "mongodb://admin:admin12345678@ds155045.mlab.com:55045/atomkit",
  { useNewUrlParser: true }
);

const db1 = mongoose.connection;
const app = express();

// Priority serve any static files.
// app.use(express.static(path.resolve(__dirname, "../client/public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                              GET                                                 ///
//////////////////////////////////////////////////////////////////////////////////////////////////////////
let Subject = db1.collection("subjects");
let Teacher = db1.collection("teachers");
let Course = db1.collection("courses");

//Get data
//home
app.get("/", function(req, res) {
  
    res.send('AtomKit Home, please add /teacher or /course or /subject as end point to retrieve data');

});

//subject API
app.get("/subject", function(req, res) {
    Subject
    .find({}, { projection: { _id: 0 } })
    .toArray(function(error, data) {
      res.send(data);
    });
});

//teacher API
app.get("/teacher", function(req, res) {
  Teacher
  .find({}, { projection: { _id: 0 } })
  .toArray(function(error, data) {
    res.send(data);
  });
});

//course API
app.get("/course", function(req, res) {
  Course
  .find({}, { projection: { _id: 0 } })
  .toArray(function(error, data) {
    res.send(data);
  });
});

//handle GET requests for teacher depends on subjectId
// RETURN NULL

app.post("/findTeacher", function(req, res) {
    console.log('findTeacher: ', req.body.subjectId);
    
    if (req.body.subjectId) {
      db.findTeacher(req.body.subjectId, function(teachers) {
        res.json(teachers);
      });
    } else {
      db.findTeacher(req.body.subjectId, function(err, teachers) {
        if (err) console.log("findteacherERROR", err);
        res.json(teachers);
      });
    }
  });






///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                                              POST                                                 ///
///////////////////////////////////////////////////////////////////////////////////////////////////////////

//add new subject to subjects table
app.post("/addsub", function(req, res) {
  db.saveSubject(req.body, function(done, err) {
    if (err) {
      throw err;
    }
    console.log("saved sub");
    res.send("done");
  });
});

//add new teacher to teachers table
app.post("/addteacher", function(req, res) {
  db.saveTeacher(req.body, function(done, err) {
    if (err) {
      throw err;
    }
    console.log("saved teacher");
    res.send("done");
  });
});

//add new course to courses table
app.post("/addcourse", function(req, res) {
  db.saveCourse(req.body, function(done, err) {
    if (err) {
      throw err;
    }
    console.log("saved course");
    res.send("done");
  });
});

// All remaining requests return the React app, so it can handle routing.
// app.get("*", function(request, response) {
//   response.sendFile(path.resolve(__dirname, "../client/public", "index.html"));
// });

app.listen(PORT, function() {
  console.error(
    `Node cluster worker ${process.pid}: listening on port ${PORT}`
  );
});
