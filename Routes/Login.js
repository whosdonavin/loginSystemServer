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
          res.status(400).json({
            status: "Error",
            message: "This username does not exist.",
          });
        }

        const dbPassword = result[0].password;

        bcrypt.compare(reqPassword, dbPassword).then((match) => {
          if (!match) {
            res.status(400).json({
              status: "Error",
              message: "Incorrect username &password combination.",
            });
          } else {
            res.send({ status: "Success", message: "Authenticated." });
          }
        });

        connection.release();
      }
    );
  });
});

module.exports = router;
