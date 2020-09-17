const joi = require('joi')
const Joi = require('joi')
const _ = require('lodash')
const errors = require('../errores/errors')
const schema = joi.object({
  
    titulo: Joi.string().min(10).max(150),
    contenido: Joi.string().min(10).max(5000),
    imagen: Joi.string().min(15),
    categoria: Joi.number().positive()
})

const extensiones = ['jpeg', 'jpg', 'png', 'gif']
// Este metodo valida si la url termina en un formato de imagen.
// Puede ser que la URL no tenga ese formato pero sin embargo sea una imagen
function ValidarImagen(url) {
  const array = url.split('.')
  const extension = array[array.length - 1]
  const imagen = extensiones.find(ext => ext == extension)
  if (!_.isNull(imagen)) {
    throw new errors.BadRequest('El formato de la imagen no es correcto')
  }
}
async function validarModelo(contenido) {
  if (_.isEmpty(contenido)) {
    throw new errors.BadRequest('No se han ingresado datos')
  }
  try {
    await schema.validate(contenido)
    if (!_.isUndefined(contenido.imagen)) {
      ValidarImagen(contenido.imagen)
    }
    
  } catch(err) {
    throw new errors.BadRequest('Informacion ingresada incorrecta:' + err.message )
  }
} 

module.exports = validarModelo