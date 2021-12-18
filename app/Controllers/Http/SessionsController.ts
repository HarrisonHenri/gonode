import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

const sessionSchema = schema.create({
  password: schema.string(),
  email: schema.string({}, [rules.email()]),
})

export default class SessionsController {
  public async store({ request, auth }: HttpContextContract) {
    const { email, password } = await request.validate({ schema: sessionSchema })
    const token = await auth.attempt(email, password)
    return token
  }
}
