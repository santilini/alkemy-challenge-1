// const {categorias, posts} = require('../db').db
const {db} = require('../db')
const _ = require('lodash')
const errors = require('../errores/errors')


async function createPost(contenido) {
  return await db.posts.create(contenido)
}
async function getAllPosts() {
  return await db.posts.findAll({})
}

async function getPostsByQuery(query) {
  return await db.posts.findAll({
    where: query
  })
}
async function getPostById(id) {
  return getPostExistente(id)
}

async function updatePostById(id, cambios) {
  const resultado = await getPostExistente(id)
  for (propiedad in cambios) {
    resultado[propiedad] = cambios[propiedad]
  }
  await resultado.save()
  return resultado
}
async function getPostExistente(id) {
  const resultado = await db.posts.findOne({
    where: {
      id: id
    }
  })
  if (_.isNull(resultado)) {
    throw new errors.NotFound('El id es incorrecto')
  }
  return resultado
}

async function deletePostById(id) {
  const resultado = await getPostExistente(id)
  await resultado.destroy()
}

module.exports = {
  createPost, 
  getAllPosts,
  getPostById,
  getPostsByQuery,
  updatePostById,
  deletePostById
}