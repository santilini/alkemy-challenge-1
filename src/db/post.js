
module.exports = (sequelize, Sequelize) =>  {
  const post = sequelize.define('post', {
    titulo: Sequelize.STRING,
    contenido: Sequelize.STRING(5000),
    imagen: Sequelize.STRING
  })
  return post
}

