const router = require('express').Router()
const PostsServicio = require('../servicios/postmanager')
router.get('/', async (req, res) => {
  const resultados = await PostsServicio.getAllPosts()
  res.json(resultados)
})
router.get('/:id', async (req, res) => {

})
router.post('/', async (req, res) => {
  const contenido = req.body
  console.log(contenido.contenido.length)
  const resultado = await PostsServicio.newPost(contenido)
  res.status(resultado.statusCode).json(resultado.resultado)
})
router.patch('/:id', (req, res) => {

})
router.delete('/:id', (req, res) => {

})

module.exports = router