const cookieParser = require("cookie-parser");
const db = require("../Config/Database");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/login", (req, res) => {
  const { reqUsername, reqPassword } = req.body;
  db.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      `SELECT * FROM register WHERE username = "${reqUsername}";`,
      (error, result) => {
        if (result.length === 0) {
          res.send("Username does not exist");
        }

        const dbPassword = result[0].password;

        bcrypt.compare(reqPassword, dbPassword).then((match) => {
          if (!match) {
            res.send("passwords do not match");
          } else {
            res.send("logged in");
          }
        });

        connection.release();
      }
    );
  });
});

module.exports = router;
