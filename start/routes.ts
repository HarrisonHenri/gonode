import Route from '@ioc:Adonis/Core/Route'

Route.post('users', 'UsersController.store')

Route.post('session', 'SessionsController.store')

Route.get('files/:id', 'FilesController.index')

Route.group(() => {
  Route.post('files', 'FilesController.store')
  Route.resource('projects', 'ProjectsController').apiOnly()
  Route.resource('projects.tasks', 'TasksController').apiOnly()
}).middleware(['auth'])
