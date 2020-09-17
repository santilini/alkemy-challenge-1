const router = require('express').Router()
const PostsServicio = require('../servicios/postmanager')
router.get('/', async (req, res) => {
  const resultados = await PostsServicio.getAllPosts()
  res.json(resultados)
})
router.get('/:id', async (req, res) => {
  const id = req.params.id
  const resultados = await PostsServicio.getPostById(id)
  res.status(resultados.statusCode).json(resultados.resultado)
})
router.post('/', async (req, res) => {
  const contenido = req.body
  const resultado = await PostsServicio.newPost(contenido)
  res.status(resultado.statusCode).json(resultado.resultado)
})
router.patch('/:id', async (req, res) => {
  const contenido = req.body
  const id = req.params.id
  const resultado = await PostsServicio.actualizarPost(id, contenido)
  res.status(resultado.statusCode).json(resultado.resultado)
})
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  const resultado = await PostsServicio.borrarPost(id)
  res.status(resultado.statusCode).json(resultado.resultado)
})

module.exports = router