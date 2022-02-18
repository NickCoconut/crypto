const express = require("express");
const router = express.Router();
module.exports = (db) => {

//-------------------------------ADD LIKED CRYPTO --------------------------//
router.post("/:currencyId/like", async (req, res) => {
  const { user_id } = req.session;
  if (!user_id) {
    return res.status(400).send("You need to be logged in!");
  }
  try {
    const validUser = await db.query(`SELECT * FROM users WHERE id = $1;`, [user_id]); //checking id from the db
    if (!validUser) {
      return res.redirect("/");
    }
    const { currencyId } = req.params;
    console.log("backend", currencyId)

    const urlExists = await db.query(
      `SELECT * FROM liked_cryptos WHERE crypto_url_id = $1 AND user_id = $2;`, [currencyId, validUser.rows[0].id]); //checking url from the db
    if (urlExists.rows[0]) {
      return res
        .status(400).send("The crypto is already in your liked!");
    }
    await db.query(
      `INSERT INTO liked_cryptos (crypto_url_id, user_id)
    VALUES ($1, $2) RETURNING *;`,
      [currencyId, validUser.rows[0].id]
    );
    return res.redirect("/mylikes");
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

//-------------------------------VIEW LIKED CRYPTO --------------------------//
router.get("/mylikes", async (req, res) => {
  
  const { user_id } = req.session; // checking cookies
  if (!user_id) {
    return res.redirect("/");
  }

  try {
    const validUser = await db.query(`SELECT * FROM users WHERE id = $1;`, [user_id]) //checking id from the db
    if (!validUser) {
      return res.redirect("/");
    }

    const likedCryptos = await db.query(`SELECT * FROM liked_cryptos WHERE user_id = $1;`, validUser.rows[0].id);

    return res.json(likedCryptos)

  } catch (error) {
    return res.status(400).send({message: error.message});
  }

});

return router;
};


  
