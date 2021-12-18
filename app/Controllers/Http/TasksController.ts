import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Task from 'App/Models/Task'

const taskSchema = schema.create({
  title: schema.string(),
  due_date: schema.date(),
  description: schema.string.optional(),
  fileId: schema.number.optional(),
  userId: schema.number.optional(),
})

export default class TasksController {
  public async index({ params }: HttpContextContract) {
    const tasks = await Task.query().where('project_id', params.project_id).preload('user')

    return tasks
  }

  public async store({ request, params }: HttpContextContract) {
    const data = await request.validate({ schema: taskSchema })

    const task = await Task.create({ ...data, projectId: params.project_id } as Task)

    return task
  }

  public async show({ params }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)

    return task
  }

  public async update({ params, request }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)

    const data = request.only(['title', 'description', 'due_date', 'user_id', 'file_id'])

    task.merge(data)

    await task.save()

    return task
  }

  public async destroy({}: HttpContextContract) {}
}
