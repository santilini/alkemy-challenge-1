const router = require('express').Router()
const repositorioCategorias = require('../repositorio/categorias')
const cache = require('../servicios/cache')
router.get('/', async (req, res) => {
  let resultados = await cache.getCacheFromString(cache.querys.CATEGORIAS)
  try {
    if (!resultados) {
      resultados = await repositorioCategorias.getCategorias()
      cache.cacheValue(cache.querys.CATEGORIAS, resultados)
    }
    res.json(resultados)
  } catch(error) {
    console.log(error)
    res.status(500).json({message: 'Error interno del servidor'})
  }
})

module.exports = router