'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Follower extends Model {
    static get table() {
        return "followers";
    }
    follower() {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Follower
