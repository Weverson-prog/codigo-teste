'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RepositoriesStarsSchema extends Schema {
  up() {
    this.create('repositories_stars', (table) => {
      table.increments()
      table.integer("user_id").unsigned().references("id").inTable("users").notNullable();
      table.integer("repository_id").unsigned().references("id").inTable("repositories").notNullable();
      table.timestamps()
    })
  }

  down() {
    this.drop('repositories_stars')
  }
}

module.exports = RepositoriesStarsSchema
