const db = require("../Config/Database");
const express = require("express");
const router = express.Router();
const { validateToken } = require("../Middleware/Jwt");

router.get("/dashboard", validateToken, (req, res) => {
  res.send("dashboard");
});

module.exports = router;
