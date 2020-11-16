'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments().unique()
      table.string('name', 40).notNullable()
      table.string('email', 30).notNullable().unique()
      table.string('plate', 40).notNullable()
      table.string('image').notNullable()
      table.string('username', 40).notNullable().unique()
      table.string('biography', 150).notNullable()
      table.integer('follower_id').unsigned().references("id").inTable('users')
      table.integer('following_id').unsigned().references("id").inTable('users')
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UsersSchema
