const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// Routes
const Register = require("./Routes/Register");
const Login = require("./Routes/Login");

app.use("/api", Register);
app.use("/api", Login);

app.listen(3333, () => {
  console.log("Connected");
});
