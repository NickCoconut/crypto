const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

//register page
module.exports = (db) => {
  router.post("/register", async (req, res) => {
    const { username, email, password } = req.body.formDetails;

    const emailExists = await db.query(
      `SELECT * FROM users WHERE email = $1;`,
      [email]
    ); //checking email from the db
    if (emailExists.rows[0]) {
      return res.json({ loggedIn: false});
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      await db.query(
        `INSERT INTO users (user_name, email, password) VALUES ($1, $2, $3) RETURNING *;`,
        [username, email, hashedPassword]
      );

      
      return res.json({ signedUp: true});
    }
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body.formDetails;

    const validUser = await db.query(`SELECT * FROM users WHERE email = $1;`, [
      email,
    ]); //checking email from the db

    if (!validUser.rows[0]) {
      return res.json({loggedIn:false})
    } else {
      const passwordMatch = bcrypt.compareSync(
        password,
        validUser.rows[0].password
      ); //checking the existing password with the inserted
      if (!passwordMatch) {
        return res.json({loggedIn:false, status:"password doesnt match"})
      } else {
        req.session.user = validUser.rows[0];
        return res.json({ loggedIn: true});
      }
    }
  });

  router.post("/logout", (req, res) => {
    req.session = null;
    return res.redirect("/");
  });

  return router;
};
