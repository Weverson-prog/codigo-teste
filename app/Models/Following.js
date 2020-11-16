'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Following extends Model {
    static get table() {
        return "followings";
    }
    following() {
        return this.belongsTo('App/Models/User')
    }

}
module.exports = Following
