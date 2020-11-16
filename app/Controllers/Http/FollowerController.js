'use strict'

const User = use("App/Models/User")
const Follower = use("App/Models/Follower")

class FollowerController {
    async index() {
    }

    /*const user = await User.query().where("id", params.id).firstOrFail()
        return user*/
    async show({ response, auth }) {
        const user_auth = auth.user
        const follower_id = await Follower.query().where("user_id", user_auth.id).fetch()
        var followers = []
        const follower_id_JSON = follower_id.toJSON()
        if (follower_id_JSON && follower_id_JSON.length >= 1) {
            for (let index = 0; index < follower_id_JSON.length; index++) {
                const element = follower_id_JSON[index];
                const user_data = await User.query().where("id", element.user_follower_id).firstOrFail()
                followers.push(user_data)
            }
        } else {
            return response.status(401).json("você não tem seguidores!")
        }
        return followers
    }
    async store() {
    }
    async update() {
    }

    async destroy() {
    }
}

module.exports = FollowerController
