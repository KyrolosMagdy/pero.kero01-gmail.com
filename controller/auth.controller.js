const User = require("../modules/user");
const jwt = require("jsonwebtoken");

// import bcrypt

//const bcrypt = require('bcryptjs');

exports.signUp = (req, res) => {
  const { email, name, password } = req.body;
  console.log(`we aint supposed to end up here`);
  if (!email.length || !name.length || !password.length) {
    console.log("auth shouldnot work");
    return res.status(422).json({
      message: "error creating your account"
    });
  }
  User.findOne({ email: email }).then(userDoc => {
    console.log(`we aint supposed to end up hkljgkere`);
    if (userDoc) {
      return res.status(422).json({
        message: "this email already exists"
      });
    } else {
      //bcrypt.hash(password, 12).then(add the logic).catch(do something with the err)
      const user = new User({
        email,
        password,
        name
      });
      user
        .save()
        .then(result => {
          res.status(201).json({ message: "Usre created", userId: result._id });
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
};

exports.login = (req, res) => {
  const { email, name, password } = req.body;
  if (!email.length || !password.length) {
    return res.status(422).json({
      message: "error loging in to your account"
    });
  }
  let loadedUser;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(422).json({ message: "User not found" });
      }
      loadedUser = user;
      // ideally, we would use bcrypt here also
      if (user.password !== password) {
        return res.status(422).json({ message: "wrong user credential" });
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userid: loadedUser._id.toString()
        },
        process.env.ADD_YOUR_TOOKEN_SECRET,
        {
          expiresIn: "1h"
        }
      );
      return res
        .status(200)
        .json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch(err => {
      console.log(err);
    });
};
