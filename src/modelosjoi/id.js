const Joi = require('joi')
const errors = require('../errores/errors')
const schema = Joi.object({
  id: Joi.number().positive().integer()
})

async function validarId(id) {
  try {
    await schema.validateAsync({id})
  } catch(error) {
    throw new errors.BadRequest('Id Invalido')
  }
}

module.exports = validarId