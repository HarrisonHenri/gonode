import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

const userSchema = schema.create({
  username: schema.string(),
  password: schema.string(),
  email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
})

export default class UsersController {
  public async store({ request }: HttpContextContract) {
    const data = await request.validate({ schema: userSchema })

    const user = await User.create(data)

    return user
  }
}
