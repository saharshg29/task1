"use strict";
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const express = require("express");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Joi = require("joi");
const model = require("../modal/user");
const User = mongoose.model("User");

const authRoute = express.Router();

authRoute.post("/", async (req, res) => {
  const { username, password } = req.body;
  // console.log("this is line 16",req.body)
  if (!username || !password) {
    console.log({username,password})
    return res.status(422).json({ error: "please add username or password" });
  }
  User.findOne({ username: username }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid username or password" });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({message:"successfully signed in"})
          const token = jwt.sign({ _id: savedUser._id }, "JWT_SECRET");
          const { _id, name, username, followers, following, pic } = savedUser;
          res.json({
            token,
            user: { _id, username, password },
          });
        } else {
          return res.status(422).json({ error: "Invalid username or password" });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  });
});

module.exports = authRoute;
