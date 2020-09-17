const joi = require('joi')
const Joi = require('joi')
const _ = require('lodash')
const errors = require('../errores/errors')
const schema = joi.object({
  
    titulo: Joi.string().min(10).max(150).required(),
    contenido: Joi.string().min(10).max(5000).required(),
    imagen: Joi.string().min(15).required(),
    categoria: Joi.number().positive().required()
})

const extensiones = ['jpeg', 'jpg', 'png', 'gif']
// Este metodo valida si la url termina en un formato de imagen.
// Puede ser que la URL no tenga ese formato pero sin embargo sea una imagen
function ValidarImagen(url) {
  const array = url.split('.')
  const extension = array[array.length - 1]
  const imagen = extensiones.find(ext => ext == extension)
  console.log('extension: ' + extension)
  console.log('imagen' + imagen);
  if (imagen == null || _.isUndefined(imagen)) {
    throw new errors.BadRequest('El formato de la imagen no es correcto')
  }
}
async function validarModelo(contenido) {
  if (_.isEmpty(contenido)) {
    throw new errors.BadRequest('No se han ingresado datos')
  }
  try {
    await schema.validateAsync(contenido)
    ValidarImagen(contenido.imagen)
  } catch(err) {
    console.log(err)
    throw new errors.BadRequest('Informacion ingresada incorrecta: ' + err.message)
  }
} 

module.exports = validarModelo