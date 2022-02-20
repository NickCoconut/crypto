const express = require("express");
const router = express.Router();
module.exports = (db) => {

//-------------------------------ADD LIKED CRYPTO --------------------------//
router.post("/:currencyId/like", async (req, res) => {
  const id = req.session?.user?.id;
  
  if (!id) {
    return res.status(400).send("You need to be logged in!");
  }
  try {
    const validUser = await db.query(`SELECT * FROM users WHERE id = $1;`, [id]); //checking id from the db
    if (!validUser) {
      return res.status(200);
    }
    const { currencyId } = req.params;

    const coinExists = await db.query(
      `SELECT * FROM liked_cryptos WHERE crypto_url_id = $1 AND user_id = $2;`, [currencyId, validUser.rows[0].id]); //checking url from the db
    if (coinExists.rows[0]) {
      return res
        .status(400).send("The crypto is already in your liked!");
    }
    await db.query(
      `INSERT INTO liked_cryptos (crypto_url_id, user_id)
    VALUES ($1, $2) RETURNING *;`,
      [currencyId, validUser.rows[0].id]
    );
    return res.status(200);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

//-------------------------------VIEW LIKED CRYPTO --------------------------//
router.get("/mylikes", async (req, res) => {
  
  const id = req.session?.user?.id; // checking cookies
  if (!id) {
    return res.status(200);
  }

  try {
    const validUser = await db.query(`SELECT * FROM users WHERE id = $1;`, [id]) //checking id from the db
    if (!validUser) {
      return res.status(200);
    }

    const likedCryptos = await db.query(`SELECT * FROM liked_cryptos WHERE user_id = $1;`, [validUser.rows[0].id]);

    return res.json(likedCryptos)

  } catch (error) {
    return res.status(400).send({message: error.message});
  }

});

//-------------------------------REMOVE LIKED NOTES --------------------------//
router.post("/:currencyId/unlike", async (req, res) => {
  const id = req.session?.user?.id;;
  if (!id) {
    return res.status(400).send("You need to be logged in!");
  }
  try {
    const validUser = await db.query(`SELECT * FROM users WHERE id = $1;`, [id]); //checking id from the db
    if (!validUser) {
      return res.status(200);
    }
    const { currencyId } = req.params;
    const coinObject = await db.query(`SELECT * FROM liked_cryptos WHERE crypto_url_id = $1 AND user_id = $2;`, [currencyId, validUser.rows[0].id]); //checking id from the db
    
    if (!coinObject) {
      return res.status(404).send({ message: "Crypto is not found" });
    }

    const updateCryptos = await db.query(`DELETE FROM liked_cryptos WHERE crypto_url_id = $1;`, [currencyId]);
    
    return res.send(updateCryptos);
  } catch (error) {
     return res.status(400).send({ message: error.message });
   }
 });

  return router;

};


  
