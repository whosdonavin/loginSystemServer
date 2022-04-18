const db = require("../Config/Database");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  db.getConnection((err, connection) => {
    if (err) throw err;

    bcrypt.hash(password, 5).then((hash) => {
      connection.query(
        "INSERT INTO register(username,password) VALUES (?,?)",
        [username, hash],
        (error, result) => {
          if (error) {
            res.send("This username is already registred.");
          } else {
            res.send("User has been created.");
          }
        }
      );
    });

    connection.release();
  });
});

module.exports = router;
