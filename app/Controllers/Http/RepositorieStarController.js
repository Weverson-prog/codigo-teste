'use strict'

const RepositorieStar = use("App/Models/Repositorie_star")

class RepositorieStarController {
    async index() {

    }
    async show({ params, response }) {
        const stars = await RepositorieStar.query().where("repository_id", params.id).fetch()
        if (stars.toJSON().length >= 0) {
            const allstars = await RepositorieStar.query().fetch()
            return allstars.toJSON().length
        } else {
            return response.status(401).json("Este repositorio não possui estrelas!")
        }
    }

    async store({ request, params, auth, response }) {
        const option = JSON.stringify(request.only(["star"]))
        const confirm = JSON.stringify({ "star": true })


        if (option == confirm) {

            const search = await RepositorieStar.findBy("repository_id", params.id)
            if (search) {
                console.log(search)
                return response.status(200).json("você já deu uma estrela neste repositorio!")
            }

            const data = { "user_id": auth.user.id, "repository_id": params.id }
            RepositorieStar.create(data)
            return response.status(200).json("você deu uma estrela neste repositorio!")
        } else {
            await RepositorieStar.query().where("user_id", auth.user.id).delete()
            return response.status(200).json("você retirou um estrela deste repositorio!")
        }
    }
    async update() {

    }

    async destry() {

    }
}

module.exports = RepositorieStarController
