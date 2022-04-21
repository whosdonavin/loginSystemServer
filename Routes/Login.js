const cookieParser = require("cookie-parser");
const db = require("../Config/Database");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("../Middleware/Jwt");
const { createToken } = require("../Middleware/Jwt");

router.post("/login", (req, res) => {
  const { reqUsername, reqPassword } = req.body;
  db.getConnection((err, connection) => {
    if (err) throw err;

    connection.query(
      `SELECT * FROM register WHERE username = "${reqUsername}";`,
      (error, result) => {
        const user = result[0];
        if (result.length === 0) {
          res.send({
            status: "Error",
            message: "This username does not exist.",
            authenticated: false,
          });
        }

        const dbPassword = result[0].password;

        bcrypt.compare(reqPassword, dbPassword).then((match) => {
          if (!match) {
            res.send({
              status: "Error",
              message: "Incorrect username & password combination.",
            });
          } else {
            // res.send(user);
            const accessToken = createToken(user);
            res.cookie("accessToken", accessToken, {
              httpOnly: true,
              maxAge: 1209600000,
            });
            res.send({
              status: "Success",
              message: "Successfully logged in.",
              authenticated: true,
            });
          }
        });

        connection.release();
      }
    );
  });
});

module.exports = router;
