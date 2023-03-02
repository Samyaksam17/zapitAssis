var mongoose = require("mongoose");

//task schema

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  assignee: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
  },
//   expire_On: {
//     type: Date,
//   },
  completed: {
    type: Boolean,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    // required: true,
  },
});

// model
var task = mongoose.model("task", taskSchema);

//Add task
const createtask = function (newtask, callback) {
  task.create(newtask, callback);
};
//update
const updatetask = function (query, data,options, callback) {
  task.findOneAndUpdate(query, data,options, callback);
};
//getalltask
const getAlltask = function (query, callback) {
  task.find(query, callback);
};


//gettaskbyid
const taskbyid = function (query, callback) {
  task.findById(query, callback);
};

//removetask
const deletetask = function (query, callback) {
  task.remove(query, callback);
};

module.exports = {
  createtask,
  updatetask,
  getAlltask,
  taskbyid,
  deletetask,
};
