'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FollowingSchema extends Schema {
  up() {
    this.create('followings', (table) => {
      table.increments()
      table.integer("user_id").unsigned().references("id").inTable("users").notNullable();
      table.integer("user_following_id").unsigned().references("id").inTable("users").notNullable();
      table.timestamps()
    })
  }

  down() {
    this.drop('followings')
  }
}

module.exports = FollowingSchema
