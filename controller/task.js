const task = require("../model/task");
const USER = require("../model/user");

const add = (req, res) => {
  var api_key = req.body.api_key;
  var name = req.body.name;
  var description = req.body.description;
  var assignee = req.body.assignee;
  var completed = req.body.completed;

  //validation
  req.checkBody("api_key", "api key is required").notEmpty();
  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("description", "description is required").notEmpty();
  req.checkBody("assignee", "assignee is required").notEmpty();
  req.checkBody("completed", "completed is required").notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.json({ status: false, error: errors });
  } else {
    USER.User.find({ api_key }, function (err, api_res) {
      if (err) return res.json({ status: false, message: "API Key Not Found" });
      if (api_res.length == 0)
        return res.json({ status: true, message: "Enter API KEY" });
      else {
        let taskObj = {
          name: name,
          description: description,
          assignee: assignee,
          completed: completed,
          created_at: Date(),
          expire_On: Date(),
        };

        task.createtask(taskObj, (err, result) => {
          if (err) return res.json({ status: false, error: err });
          else return res.json({ status: true, response: result });
        });
      }
    });
  }
};

// update task
const update = (req, res) => {
  var api_key = req.body.api_key;
  var task_id = req.body.task_id;
  var name = req.body.name;
  var description = req.body.description;
  var assignee = req.body.assignee;
  var completed = req.body.completed;

  req.checkBody("api_key", "api key is required").notEmpty();
  req.checkBody("task_id", "task_id is required").notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.json({ status: false, message: "API Key Not Found" });
    if (api_res.length == 0)
      return res.json({ status: false, message: "Enter API KEY" });
    else {
      USER.User.find({ api_key }, function (err, api_res) {
        if (err) return res.json({ status: false, message: "Enter API KEY" });
        else {
          task.updatetask(
            { _id: task_id },
            {
              name: name,
              description: description,
              assignee: assignee,
              completed: completed,
            },
            { new: true },
            function (err, task) {
              if (task) {
                return res.json({ status: true, response: task });
              } else {
                return res.json({
                  status: false,
                  message: "can't able to update",
                });
              }
            }
          );
        }
      });
    }
  }
};

// get all task

const alltask = (req, res) => {
  var api_key = req.body.api_key;
  var query = req.body.query;

  req.checkBody("api_key", "api key is required").notEmpty();
  req.checkBody("query", "query is required").notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.json({ status: false, error: errors });
  } else {
    USER.User.find({ api_key }, function (err, api_res) {
      if (err) return res.json({ status: false, message: "API Key Not Found" });
      if (api_res.length == 0)
        return res.json({ status: false, message: "Enter API KEY" });
      else {
        task.getAlltask(query, (err, task) => {
          if (err) return res.json({ staus: true, response: task });
          else {
            return res.json({ status: false, message: "Error occured" });
          }
        });
      }
    });
  }
};

// get task by id
const taskById = (req, res) => {
  var api_key = req.body.api_key;
  var task_id = req.body.task_id;

  // validation
  req.checkBody("api_key", "api key is required").notEmpty();
  req.checkBody("task_id", "task_id is required").notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.json({ status: false, error: errors });
  } else {
    USER.User.find({ api_key }, function (err, api_res) {
      if (err) return res.json({ status: false, message: "API Key Not Found" });
      if (api_res.length == 0)
        return res.json({ status: false, message: "Enter API KEY" });
      else {
        task.taskbyid({ _id: task_id }, (err, task) => {
          if (err) return res.json({ status: false, message: "id is wrong" });
          else return res.json({ status: true, response: task });
        });
      }
    });
  }
};

const remove = (req, res) => {
  var api_key = req.body.api_key;
  var task_id = req.body.task_id;

  //validation
  req.checkBody("api_key", "api key is required").notEmpty();
  req.checkBody("task_id", "task_id is required").notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.json({ status: false, error: errors });
  } else {
    USER.User.find({ api_key }, function (err, api_res) {
      if (err) return res.json({ status: false, message: "API Key Not Found" });
      if (api_res.length == 0)
        return res.json({ status: false, message: "Enter API KEY" });
      else {
        task.deletetask({ _id: task_id }, (err, task) => {
          if (task)
            return res.json({ status: true, message: "removed successfully" });
          else
            return res.json({
              status: false,
              response: err,
              message: "error occured while removing",
            });
        });
      }
    });
  }
};

module.exports = {
  add,
  update,
  taskById,
  alltask,
  remove,
};
