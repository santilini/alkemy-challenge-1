const db = require('../db').db

async function getCategoria(id) {
  return await db.categorias.findOne({
    where: {
      id:id
    }
  })
}
async function getCategorias() {
  return await db.categorias.findAll({})
}
module.exports = {getCategoria, getCategorias}