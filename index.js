const Express = require('express')
const app = Express()
const {inicializarDB} = require('./src/db')
const posts = require('./src/rutas/posts')
const port = 4000
app.use(Express.json())

app.use('/api/posts', posts)

inicializarDB(() => app.listen(port, () => {
  console.log('Servidor Corriendo')
}))
