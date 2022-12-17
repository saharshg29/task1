const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("@hapi/joi");
const _ = require("lodash");
const model = require("../modal/user");
const { default: mongoose } = require("mongoose");
const User = mongoose.model("User");

const userRouter = express.Router();


userRouter.post("/", async (req, res) => {
  const {  email, password, username} =
    req.body;
  if (!email || !password || !username ) {
    return res.json({ error: "Please fill up all the fields" });
  } else {
    User.findOne({email} || {username})
      .then((savedUser) => {
        if (savedUser) {
          console.log(savedUser)
          return res.json({ error: "User already exist" });
        } 
        else {
          bcrypt.hash(password, 12).then((hashedPassword) => {
            const user = new User({
              email,
              password: hashedPassword,
              username,
            });
            user
              .save()
              .then((user) => {
                res.status(200).json({ user });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

module.exports = userRouter;
