const bcrypt = require('bcryptjs')

const userAccounts = [
    {
        name: "testAdmin",
        email: "admin@node.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "testUser",
        email: "user@node.com",
        password: bcrypt.hashSync("123456", 10),
    },
]

module.exports = userAccounts