const mongoose = require("mongoose");
//mongoose.connect('mongodb://localhost/test');
mongoose.connect(
  "mongodb://admin:admin12345678@ds155045.mlab.com:55045/atomkit",
  { useNewUrlParser: true }
);

const db = mongoose.connection;
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
db.on("error", function() {
  console.log("mongoose connection error");
});

db.once("open", function() {
  console.log("mongoose connected successfully");
});

const SubSchema = new Schema({
  name: String
});

const TeacherSchema = new Schema({
  name: String,
  description: String,
  image: String,
  subjectId: { type: mongoose.Schema.ObjectId, ref: "Subject" },
});

const CourseSchema = new Schema({
  name: String,
  price: Number,
  view: Number,
  duration: Number,
  teacherId: { type: mongoose.Schema.ObjectId, ref: "Teacher" }
});

const Subject = mongoose.model("Subject", SubSchema);
const Teacher = mongoose.model("Teacher", TeacherSchema);
const Course = mongoose.model("Course", CourseSchema);

//saving subject to Subjects table
const saveSubject = (data, cb) => {
  let sub = new Subject({
    name: data["name"]
  });
  sub.save(function(err) {
    if (err) throw err;
    cb(true);
  });
};

//saving teacher to Teachers table
const saveTeacher = (data, cb) => {
  let teacherNew = new Teacher({
    name: data["name"],
    description: data["description"],
    image: data["image"],
    subjectId: data["subjectId"]
  });
  teacherNew.save(function(err) {
    if (err) throw err;
    cb(true);
  });
};

//saving course to Courses table
const saveCourse = (data, cb) => {
  let courseNew = new Course({
    name: data["name"],
    price: data["price"],
    view: data["view"],
    duration: data["duration"]
  });
  courseNew.save(function(err) {
    if (err) throw err;
    cb(true);
  });
};

//finding all teacher based on the provided subjectId
//using aggregation to get all the teacher details from teachers table
const findTeacher = (subjectId, callback) => {
  db.collection("teachers")
    .aggregate([
      {
        $lookup: {
          from: "teachers",
          pipeline: [{ $match: { subjectId: ObjectId(subjectId) } }],
          as: "teachers"
        }
      }
    ])
    .toArray(function(err, res) {
      console.log('hiiiiiii',res, err);
      if (err) callback(err, null);
      callback(null, res);
    });
};

module.exports.Subject = Subject;
module.exports.Teacher = Teacher;
module.exports.Course = Course;

module.exports.saveSubject = saveSubject;
module.exports.saveTeacher = saveTeacher;
module.exports.findTeacher = findTeacher;
module.exports.saveCourse = saveCourse;
