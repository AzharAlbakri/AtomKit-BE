const mongoose = require("mongoose");
mongoose.connect(
  "mongodb://admin:admin12345678@ds155045.mlab.com:55045/atomkit",
  {
    useNewUrlParser: true
  }
);

// const bcrypt = require("bcrypt");
// const SALT_WORK_FACTOR = 10;
const db = mongoose.connection;
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
db.on("error", function() {
  console.log("mongoose connection error");
});

db.once("open", function() {
  console.log("mongoose connected successfully");
});

const SubjectSchema = new Schema({
  name: {
    type: String
  }
});

const TeacherSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  }
});

const CourseSchema = new Schema({
  name: {
    type: String
  },
  price: {
    type: Number
  },
  view: {
    type: Number
  },
  duration: {
    type: Number
  }
});

const Subject = mongoose.model("Subject", SubjectSchema);
const Teacher = mongoose.model("Teacher", TeacherSchema);
const Course = mongoose.model("Course", CourseSchema);


const saveSub = (data, cb) => {
    let subnew = new Subject({
      name: data["name"],
    });
    subnew.save(function(err) {
      if (err) throw err;
      cb(true);
    });
  };



module.exports.saveSub = saveSub;

module.exports.Subject = Subject;
module.exports.Teacher = Teacher;
module.exports.Course = Course;
