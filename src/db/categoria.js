module.exports = (sequelize, Sequelize) =>  {
  const categoria = sequelize.define('categoria', {
    nombre: Sequelize.STRING
  })
  return categoria
}