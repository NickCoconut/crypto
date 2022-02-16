const client = require('../db')

// const registerUser = function(user, pool) {
//   return client.query(`INSERT INTO users (user_name, email, password) VALUE ($1, $2, $3) returning *;`
//   , [user.username, user.email, user.passowrd])
//   .then(res => {
//     return res.rows[0]
//    })
// }
// exports.registerUser = registerUser;

const getallusers = function(){
  return client.query('select * from users;')
  .then(res => {
    return res.rows
   })
}

exports.getallusers = getallusers;