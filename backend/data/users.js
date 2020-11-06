const bcrypt = require('bcryptjs')

const users = [
  {
    name: 'Main Admin',
    email: 'mainadmin@cblbiscuit.com',
    password: bcrypt.hashSync('123456', 10),
    isMainAdmin: true    
  },
  {
    name: 'Secondary Admin',
    email: 'secondaryadmin@cblbiscuit.com',
    password: bcrypt.hashSync('123456', 10)
  },
  {
    name: 'Delivery Person',
    email: 'deliveryperson@cblbiscuit.com',
    password: bcrypt.hashSync('123456', 10)
  }
]

module.exports = users
