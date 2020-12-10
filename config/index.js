'use strict'

function loadEnvVariable(keyname) {
  const envVar = process.env[keyname]

  if (!envVar) throw new Error(`Must be a enviroment variable called: ${keyname}`)

  return envVar
}

module.exports = {
  postgresUri: loadEnvVariable('POSTGRES_URI')
}
