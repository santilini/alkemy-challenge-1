const repositorio = require('../repositorio/posts')
const PostSchema = require('../modelosjoi/post')
async function getAllPosts() {
  return await repositorio.getAllPosts()
}

async function getPostById(id) {
  try {
    await repositorio.getPostById(id)
  } catch (error) {
    console.log(error)
    return parsearResultadoDeError(error)
  }
}

async function newPost(contenido) {
  try {
    await PostSchema(contenido)
    const resultado = await repositorio.createPost(contenido)
    return {resultado, statusCode: 200}
  } catch (err) {
    console.log(err)
    return parsearResultadoDeError(err)
  }
}
function parsearResultadoDeError(err) {
  return {
    resultado: {message: err.message},
    statusCode: err.statusCode || 500
  }
}
module.exports = { newPost, getAllPosts, getPostById}