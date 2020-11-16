'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Repositorie extends Model {
    static get table(){
        return "repositories";
    }
    user(){
        return this.belongsTo('App/Models/User')
    }
    repositorie_stars(){
        return this.hasMany('App/Models/Repositorie_star')
    }
    
}

module.exports = Repositorie
