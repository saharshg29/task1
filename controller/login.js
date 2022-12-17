"use strict";
const mongoose = require("mongoose")
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
  const { username, password, accounttype } = req.body;

  if (!username || !password ) {
    res.status(400).json({ msg: "Please fill all the fields" });
  } else {
    User.findOne({ username: username})
      .then((user) => {
        if (!user) {
          res.status(400).json({ msg: "User does not found" });
        } else {
          console.log(user);
          bcrypt.compare(password, user.password, (err, ress) => {
            if (err) {
              res.json({ err });
            }
            if (ress) {
              const token = jwt.sign({ _id: user._id }, "tokyo@json");
              const { _id, email, username } = user;
              res.json({ token: token, user: { _id, email, username } });
            } else {
              return response.json({
                success: false,
                message: "passwords do not match",
              });
            }
          });
        }
      })

      .catch((err) => {
        console.error(err);
      });
  }
});

module.exports = authRoute;
