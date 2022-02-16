const { client } = require('../db')

const registerUser = function (user, pool) {
    return pool.query(`INSERT INTO users (username, email, password) VALUE ($1, $2, $3) returning *`,
        [user.userName, user.email, user.password])
        .then(res => {
            return res.rows[0]
        })
}
exports.registerUser = registerUser;

const getAllUsers = function(){
    return pool.query('select * from users;')
    .then(res => {
        return res.rows[0]
    })
}

exports.getAllUsers = getAllUsers;