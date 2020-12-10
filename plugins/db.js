'use strict'

const fp = require('fastify-plugin')
const pgp = require('pg-promise')()
const DBMigrate = require('db-migrate')

const appConfig = require('../config')

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

async function runMigrations() {
  return new Promise((resolve, reject) => {
    const dbMigrate = DBMigrate.getInstance(true)

    dbMigrate.up((err, results) => {
      if (err) return reject(err)

      return resolve(results)
    })
  })
}

module.exports = fp(async function (fastify, opts) {
  const db = pgp(appConfig.postgresUri)
  
  fastify.decorate('db', db)

  runMigrations()
    .then(migrations => migrations.length > 0 && fastify.log.info({
      migrationsCount: migrations.length, msg: 'Migrations successfully executed'
    }))
    .catch(err => fastify.log.error({ error: err, msg: 'Migrations failed' }))
})
