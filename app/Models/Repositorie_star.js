'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Repositorie_star extends Model {
    static get table(){
        return "repositories_stars";
    }
    repositorie(){
        return this.belongsTo('App/Models/Repositorie')
    }

}

module.exports = Repositorie_star
