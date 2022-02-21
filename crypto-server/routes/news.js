const express = require("express");
const router = express.Router();
module.exports = (db) => {

//-------------------------------ADD LIKED NEWS --------------------------//
router.post("/likedNews", async (req, res) => {

  const id = req.session?.user?.id;
  if (!id) {
    return res.status(400).send("You need to be logged in!");
  }
  try {
    const validUser = await db.query(`SELECT * FROM users WHERE id = $1;`, [id]); //checking id from the db
    if (!validUser) {
      return res.status(200);
    }
    const { likedNewsUrl } = req.body;

    const newsExists = await db.query(
      `SELECT * FROM liked_news WHERE news_url = $1 AND user_id = $2;`, [likedNewsUrl, validUser.rows[0].id]); //checking url from the db
    if (newsExists.rows[0]) {
      return res
        .status(400).send("The news is already in your liked!");
    }
    await db.query(
      `INSERT INTO liked_news (news_url, user_id)
    VALUES ($1, $2) RETURNING *;`,
      [likedNewsUrl, validUser.rows[0].id]
    );
    return res.status(200);
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
});

//-------------------------------VIEW LIKED NEWS --------------------------//
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

    const likedNews = await db.query(`SELECT * FROM liked_news WHERE user_id = $1;`, [validUser.rows[0].id]);
    
    return res.json(likedNews)

  } catch (error) {
    return res.status(400).send({message: error.message});
  }

});

//-------------------------------REMOVE LIKED NOTES --------------------------//
router.post("/unlike", async (req, res) => {
  const id = req.session?.user?.id;;
  if (!id) {
    return res.status(400).send("You need to be logged in!");
  }
  try {
    const validUser = await db.query(`SELECT * FROM users WHERE id = $1;`, [id]); //checking id from the db
    if (!validUser) {
      return res.status(200);
    }
    const { unlikedNews } = req.body;
    const newsObject = await db.query(`SELECT * FROM liked_news WHERE news_url = $1 AND user_id = $2;`, [unlikedNews, validUser.rows[0].id]); //checking id from the db
    
    if (!newsObject) {
      return res.status(404).send({ message: "News is not found" });
    }

    const updateNews = await db.query(`DELETE FROM liked_news WHERE news_url = $1;`, [unlikedNews]);
    
    return res.send(updateNews);
  } catch (error) {
     return res.status(400).send({ message: error.message });
   }
 });

  return router;

};


  
