const Express = require('express')
const app = Express()
const {inicializarDB} = require('./src/db')
const posts = require('./src/rutas/posts')
const categorias = require('./src/rutas/categorias')
const port = 4000
app.use(Express.json())

app.use('/api/posts', posts)
app.use('/api/categorias', categorias)
inicializarDB(() => app.listen(port, () => {
  console.log('Servidor Corriendo')
}))
