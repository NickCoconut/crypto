var express = require("express");
var router = express.Router();
const client = require("../db");
const bcrypt = require("bcryptjs");
const app = express();

var cookieSession = require("cookie-session");
app.use(
  cookieSession({
    name: "session",
    keys: ["key1","key2"],
  })
);

module.exports = router;

module.exports = function (router, db) {
  router.post("/register", async (req, res) => {
    const { formDetails } = req.body;

    const emailExists = await db.query(
      `SELECT * FROM users WHERE email = $1;`,
      [formDetails.email]
    );
    if (emailExists.rows[0]) {
      console.log("The email is already registered!");
      return res.status(400).send("The email is already registered!");
    }

    const hashedPassword = bcrypt.hashSync(formDetails.password, 10);

    const newTodo = await client.query(
      `INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) returning *;`,
      [formDetails.username, formDetails.email, hashedPassword]
    );
    res.json(newTodo.rows[0]);
  });

  router.post("/login", async (req, res) => {
    const { formDetails } = req.body;

    const validUser = await db.query(`SELECT * FROM users WHERE email = $1;`, [
      formDetails.email,
    ]); //checking email from the db

    if (!validUser.rows[0]) {
      console.log("This user does not exist! You have to register!");
      return res
        .status(400)
        .send("This user does not exist! You have to register!");
    }

    const passwordMatch = bcrypt.compareSync(
      formDetails.password,
      validUser.rows[0].password
    ); //checking the existing password with the inserted

    if (!passwordMatch) {
      console.log("Incorrect password!");
      return res.status(400).send("Incorrect password!");
    }

    req.session[`user_id`] =  validUser.rows[0].id;
    console.log(req.session[`user_id`] );

  });

  return router;
};
