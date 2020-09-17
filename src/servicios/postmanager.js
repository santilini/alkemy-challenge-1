const repositorio = require('../repositorio/posts')
const PostSchema = require('../modelosjoi/post')
const PostEdicionSchema = require('../modelosjoi/cambios')
async function getAllPosts() {
  const resultadoPodado = []
  const resultados = await repositorio.getAllPosts()
  for (const resultado of resultados) {
    resultadoPodado.push(arreglarRespuesta(resultado))
  }
  return resultadoPodado
}

async function getPostById(id) {
  try {
    const resultado = await repositorio.getPostById(id)
    return {
      resultado: arreglarRespuesta(resultado),
      statusCode: 200
    }
  } catch (error) {
    console.log(error)
    return parsearResultadoDeError(error)
  }
}

async function newPost(contenido) {
  try {
    await PostSchema(contenido)
    const newPost = arreglarCategoriaPost(contenido)
    const resultado = await repositorio.createPost(newPost)
    return {resultado: 
      arreglarRespuesta(resultado), 
      statusCode: 201}
  } catch (err) {
    console.log(err)
    return parsearResultadoDeError(err)
  }
}

async function actualizarPost(id, contenido) {
  try {
    await PostEdicionSchema(contenido)
    const arreglarContenido = arreglarCategoriaEnCambios(contenido)
    const resultado = await repositorio.updatePostById(id, arreglarContenido)
    return  {
      resultado: arreglarRespuesta(resultado), 
      statusCode: 202}
  } catch (err) {

    return parsearResultadoDeError(err)
  }
}

async function borrarPost( id) {
  try {
    await repositorio.deletePostById(id)
    return {resultado: {message: 'El post fue borrado con exito'}, statusCode: 203}
  } catch (err) {
    console.log(err)
    return parsearResultadoDeError(err)
  }
}
function parsearResultadoDeError(err) {
  return {
    resultado: {message: err.message || 'Internal Server Error'},
    statusCode: err.statusCode || 500
  }
}

// Estos metodos se podria obviar al 100% llamando por categoriumId, pero preferi limpiarlo y que el que llama a la api no se entere
function arreglarCategoriaPost(post) {
  return {
    titulo: post.titulo,
    contenido: post.contenido,
    imagen: post.imagen,
    categoriumId: post.categoria
  }
}
function arreglarCategoriaEnCambios(cambios) {
  const newCambios = {}
    for (cambio in cambios) {
      if (cambio == 'categoria') {
        newCambios['categoriumId'] = cambios.categoria
      } else {

        newCambios[cambio] = cambios[cambio]
      }
    }
    return newCambios
}

function arreglarRespuesta(resultado) {
  return {
    id: resultado.id,
    titulo: resultado.titulo,
    contenido: resultado.contenido,
    categoria: resultado.categoriumId,
    fechadecreacion: resultado.createdAt
  }
}
module.exports = { newPost, getAllPosts, getPostById, actualizarPost, borrarPost}