// import user model
const User = require("../model/user");
const jwt = require("jsonwebtoken");



function generatePassword(length) {
	const result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
	   result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
 }

const genAPIKEY = generatePassword(20);

const add = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  //validation
  req.checkBody("name", "name is required").notEmpty();
  req.checkBody("email", "email is required").notEmpty();
  req.checkBody("password", "Password is required").notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    return res.json({ status: false, error: errors });
  } else {
    const userObj = {
      name: name,
      email: email,
      password: password,
      api_key: genAPIKEY
    };
    // console.log(userObj);


    User.createUser(userObj, (err, result) => {
      if (err) return res.json({ status: false, error: err });
      else return res.json({ status: true, response: result , message: "-----Save your API KEY for further Operations--------" });
    });
  }
};

const login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getSingleUser({ email: email }, function (err, user) {
    if (err) return res.json({ status: false, error: err });
    if (user) {
      // console.log(user);
      User.comparePassword(password, user.password, function (err, isMatch) {
        if (err) return res.json(helper.error_response(err));
        if (isMatch) {
          const data = {
            _id: user._id,
            name: user.name,
            email: user.email,
            userType: "user",
          };

          jwt.sign(data, "secret", (err, token) => {
            return res.json({
              status: true,
              token: "JWT " + token,
              response: data,
            });
          });
        } else {
          return res.json({ status: false, message: "Invalid Password" });
        }
      });
    } else {
      return res.json({ status: false, message: "User not found" });
    }
  });
};

const remove = (req, res) => {
  const user_id = req.body.user_id;

  User.removeUser({ _id: user_id }, function (err, user) {
    if (err) return res.json({ status: false, error: err });
    if (user) {
      return res.json({
        status: true,
        response: user,
        message: "removed success",
      });
    } else {
      return res.json({ status: false, message: "User not found" });
    }
  });
};

const update = (req, res) => {
  const user_id = req.body.user_id;
  const name = req.body.name;
  const email = req.body.email;

  User.updateUser(
    { _id: user_id },
    { name: name, email: email },
    { new: true },
    function (err, user) {
      if (err) return res.json({ status: false, error: err });
      if (user) {
        return res.json({
          status: true,
          message: "update success",
          response: user
        });
      } else {
        return res.json({ status: false, message: "User not found" });
      }
    }
  );
};

// get all user
const getAllUser = (req, res) => {
  const query = req.body.query;
  User.getUsers(query, (err, result) => {
    res.json({ status: true, response: result, totaluser: result.length });
  });
};

// get user by id

const byId = (req, res) => {
  const user_id = req.body.user_id;
  User.userById({ _id: user_id }, (err, user) => {
    if (err) return res.json({ status: false, message: "id is wrong" });
    else return res.json({ status: true, response: user });
  });
};

module.exports = {
  add,
  login,
  remove,
  update,
  getAllUser,
  byId,
};
