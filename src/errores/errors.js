class BadRequest extends Error {
  constructor(message) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.statusCode = 400
    this.message = message || 'No se ha pedido bien el recurso'
  }
}
class AlreadyExists extends Error {
  constructor(message) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.statusCode = 401
    this.message = message || 'El recurso ya existe'
  }
}
class InvalidCredentials extends Error {
  constructor(message) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.statusCode = 401
    this.message = message || 'Credenciales invalidas'
  }
}
class NotFound extends Error {
  constructor(message) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.statusCode = 404
    this.message = message || 'El recurso no se encuentra'
  }
}
class RequireLogin extends Error {
  constructor(message) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.statusCode = 406
    this.message = message || 'El recurso necesita que ingreses al sitio'
  }
}
class RequirePermission extends Error {
  constructor(message) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.statusCode = 407
    this.message = message || 'No tienes los permisos para acceder al recurso'
  }
}
class InternalServerError extends Error{
  constructor(message) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.statusCode = 500
    this.message = message || 'Servicio no disponible'
  }
}

module.exports = {BadRequest, AlreadyExists, NotFound, InternalServerError, RequireLogin, RequirePermission, InvalidCredentials}