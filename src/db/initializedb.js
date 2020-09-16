const {Sequelize} = require('sequelize')
const credenciales = require('../keys/keys')

const sequelize = new Sequelize(credenciales.database, credenciales.user, credenciales.password, {
  host: credenciales.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

module.exports = sequelize