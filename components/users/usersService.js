const User = require('./usersModel');
const bcrypt = require("bcrypt");
const res = require('express/lib/response');

exports.profile = (id) => {
  return { id, name: "Mr X", email: "x@abc.xyz" }
}

exports.findUserByEmail = (email) => {
  return User.findOne({ email: email, }).lean();
};


exports.register = async (fullname, email, password) => {
  // Verify that email does not exist
  // ...
  // Create user with bcrypt(password)
  // ...


  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User();
  newUser.fullname = fullname;
  newUser.email = email;
  newUser.password = hashedPassword;
  newUser.save((err, doc) => {
    if (err) console.log(err);
  });


};
