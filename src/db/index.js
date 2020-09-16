const sequelize = require('./initializedb')
const Sequelize = require('sequelize')
const post = require('./post')
const categoria = require('./categoria')
const db = {}

async function inicializarDB (postconeccion){
  try {
    await sequelize.authenticate()
    db.posts = post(sequelize, Sequelize)
    db.categorias = categoria(sequelize, Sequelize)
    db.posts.belongsTo(db.categorias)
    await sequelize.sync({force: true})
    
    // Hardcodeo
    db.categorias.create({nombre: 'Juegos'})
    db.categorias.create({nombre: 'Ludotecnia'})
    db.categorias.create({nombre: 'Temas cotidianos'})
    db.categorias.create({nombre: 'Frustaciones de Back End'})
    db.categorias.create({nombre: 'Chistes'})
    console.log('Se ha conectado a la base de datos con exito')
    console.log(db)
    postconeccion()
  } catch (err) {
    console.log(err)
  }
}

module.exports = {db, inicializarDB}