var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

module.exports = function(router, db, db_helpers){
  router.get('/', (req,res) => {
    
    db_helpers.getallusers()
    .then(resp => {
      res.json({resp})
    })
  })
  router.post('/',(req,res) => {
    console.log(req.body);
    const abc = {name: 'abc' }
    res.json({abc})
    return 
  })
  return router
}
