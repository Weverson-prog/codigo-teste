'use strict'

const FollowerController = require("./FollowerController")

const User = use("App/Models/User")
const Following = use("App/Models/Following")
const Follower = use("App/Models/Follower")


class FollowingController {
    async index() {
    }

    async show({ response, auth }) {
        const user_auth = auth.user
        const following_id = await Following.query().where("user_id", user_auth.id).fetch()
        var followings = []
        const following_id_JSON = following_id.toJSON()
        if (following_id_JSON && following_id_JSON.length >= 1) {
            for (let index = 0; index < following_id_JSON.length; index++) {
                const element = following_id_JSON[index];
                const user_data = await User.query().where("id", element.user_following_id).firstOrFail()
                followings.push(user_data)

            }
        } else {
            return response.status(401).json("você não segue nenhum usuário!")
        }
        return followings
    }

    async store({ request, params, auth, response }) {

        const option = JSON.stringify(request.only(["follow"]))
        const confirm = JSON.stringify({ "follow": true })


        if (option == confirm) {
            const search = await Following.findBy("user_following_id", params.id)
            if (search) {
                console.log(search)
                return response.status(200).json("você já está seguindo este usuário!")
            }
            const data = { "user_id": auth.user.id, "user_following_id": params.id }
            const data_follower = { "user_id": params.id, "user_follower_id": auth.user.id }
            Following.create(data)
            Follower.create(data_follower)
            return response.status(200).json("você está seguindo este usuário!")
        } else {
            await Following.query().where("user_following_id", params.id).delete()
            return response.status(200).json("você deixou de seguir este usuário!")
        }

    }

    async update() {
    }

    async destroy() {
    }
}

module.exports = FollowingController
