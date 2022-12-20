const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const login = require("./controller/login");
const signup = require("./controller/signup");
const post = require("./controller/post")
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 5000
let cors = require("cors")


const app = express();

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://localhost:27017")
  .then(console.log("Connected successfull with MongoDB..."))
  .catch((err) => console.error(`Connection with MongoDB failed ${err}`));

//INITIALISING MODALS
require("./modal/user")
require("./modal/post")

app.use(bodyParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

// CALLING API ROUTES
app.use("/login", login);
app.use("/signup", signup);
app.use("/api", post)

app.get("/", (req, res) => {
  res.send("Welcome to the server")
  console.log("server started")
})

// PRIVATE MIDDLEWARE
// function private(req, res, next) {
//   const token = req.header("auth-token");
//   if (!token) return res.status(401).send("Access denied");

//   try {
//     const verified = jwt.verify(token, process.env.PRIVATE_TOKEN);
//     req.user = verified;

//     next();
//   } catch (error) {
//     res.status(400).send("Invalid Token");
//   }
// }

// CALLING SERVER ON PORT
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})
