const redis = require('redis')
const util = require('util')
const redisUrl = 'redis://127.0.0.1:6379'

const client = redis.createClient(redisUrl )
client.hget = util.promisify(client.hget)

function cacheValue(key, value) {
  client.hset('Post',`post ${key}`, JSON.stringify(value), 'EX', 5, () => {})
}

function deleteCache(key) {
  client.del('Post',`post ${key}`)
}
function borrarTodaLaCache(){
  client.flushdb( function (err, succeeded) {
    console.log(succeeded); // will be true if successfull
  })
}

async function getCacheFromString(key) {
  const cacheValue = await client.hget('Post',`post ${key}`)
  let resultado = null
  if (cacheValue) {
    // console.log(cacheValue)
    resultado = JSON.parse(cacheValue)
  } 
  return resultado
}

const querys = {
  ALL: 'ALL',
  CATEGORIAS: 'CATEGORIAS'
}
module.exports = {cacheValue, deleteCache, getCacheFromString, querys, borrarTodaLaCache}