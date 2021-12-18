import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Project from 'App/Models/Project'

const projectSchema = schema.create({
  title: schema.string(),
  description: schema.string(),
})

export default class ProjectsController {
  public async index({ request }: HttpContextContract) {
    const { page } = request.qs()

    const projects = await Project.query().preload('user').paginate(page)

    return projects
  }

  public async store({ request, auth }: HttpContextContract) {
    const data = await request.validate({ schema: projectSchema })

    const project = await Project.create({ ...data, userId: auth.user?.id } as Project)

    return project
  }

  public async show({ params }: HttpContextContract) {
    const project = await Project.findOrFail(params.id)

    await project.load('user')
    await project.load('tasks')

    return project
  }

  public async update({ params, request }: HttpContextContract) {
    const project = await Project.findOrFail(params.id)

    const data = request.only(['title', 'description'])

    project.merge(data)

    await project.save()

    return project
  }

  public async destroy({ params }: HttpContextContract) {
    const project = await Project.findOrFail(params.id)

    await project.delete()
  }
}
