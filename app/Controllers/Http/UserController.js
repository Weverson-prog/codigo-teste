'use strict'

const User = use("App/Models/User")
const Token = use("App/Models/Token")
const Follower = use("App/Models/Follower")
const Following = use("App/Models/Following")
const Repositorie = use("App/Models/Repositorie")
const Repositorie_star = use("App/Models/Repositorie_star")

class UserController {
    async index({ }) {
        const user = await User.query().fetch()
        return user
    }
    async show({ params }) {
        const user = await User.query().where("id", params.id).firstOrFail()
        return user
    }
    async store({ request }) {
        let data = request.only(["name", "email", "plate", "image", "username", "biography"])
        const user = await User.create(data)
        return user
    }
    async update({ request, params }) {
        let data = request.only(["name", "email", "plate", "image", "username", "biography"])
        const user = await User.query().where("id", params.id).firstOrFail()
        user.merge(data)
        await user.save()
        return user
    }
    async destroy({ response, params }) {

        const token = await Token.findBy("user_id", params.id)
        while (token) {
            const token = await Token.findBy("user_id", params.id)
            if (token) {
                token.delete()
            } else {
                break
            }
        }
        const follower = await Follower.findBy("user_id", params.id)
        while (follower) {
            const follower = await Follower.findBy("user_id", params.id)
            if (follower) {
                follower.delete()
            } else {
                break
            }
        }
        const following = await Following.findBy("user_following_id", params.id)
        while (following) {
            const following = await Following.findBy("user_following_id", params.id)
            if (following) {
                following.delete()
            } else {
                break
            }
        }
        const repositorie = await Repositorie.findBy("user_id", params.id)
        while (repositorie) {
            const repositorie = await Repositorie.findBy("user_id", params.id)
            if (repositorie) {
                repositorie.delete()
            } else {
                break
            }
        }
        const repositorie_star = await Repositorie_star.findBy("user_id", params.id)
        while (repositorie_star) {
            const repositorie_star = await Repositorie_star.findBy("user_id", params.id)
            if (repositorie_star) {
                repositorie_star.delete()
            } else {
                break
            }
        }

        await User.query().where("id", params.id).delete()
        return response.status(200).json("Usuario deletado com sucesso!")
    }
    repositories() {
        return this.hasMany('App/Models/Repositorie')
    }

}

module.exports = UserController
