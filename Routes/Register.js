const db = require("../Config/Database");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  const roles = JSON.stringify(["user"]);

  db.getConnection((err, connection) => {
    if (err) throw err;

    bcrypt.hash(password, 5).then((hash) => {
      connection.query(
        "INSERT INTO register(username,password,roles) VALUES (?,?,?)",
        [username, hash, roles],
        (error, result) => {
          if (error) {
            res.send({
              status: "Error",
              message: "Something went wrong, try again shortly.",
            });
          } else {
            res.send({
              status: "Success",
              message: "Account successfully created.",
            });
          }
        }
      );
    });
    connection.release();
  });
});

module.exports = router;
