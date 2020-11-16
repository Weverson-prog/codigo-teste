'use strict'

const Moment = use("moment")

const User = use("App/Models/User")
const Token = use("App/Models/Token")

class AuthController {
  async login({ request, auth }) {
    const { email } = request.all()
    let user = await User.findBy('email', email)

    const currentDate = Moment().utc(-3).format("YYYY-MM-DD HH:mm:ss")

    const data = { "user_id": user.id, "data_request": currentDate }

    await Token.create(data)

    return await auth.generate(user);


  }

}


module.exports = AuthController
