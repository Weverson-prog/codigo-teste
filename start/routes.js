'use strict'

const { RouteGroup } = require('@adonisjs/framework/src/Route/Manager')
const AuthController = require('../app/Controllers/Http/AuthController')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post("/createuser", "UserController.store")
Route.post("/login/token", "AuthController.login")

Route.group(() => {
  Route.get("/showusers", "UserController.index").middleware(["auth"])
  Route.get("/takinguser/:id", "UserController.show").middleware(["auth"])
  Route.put("/alteruser/:id", "UserController.update").middleware(["auth"])
  Route.delete("/deleteuser/:id", "UserController.destroy").middleware(["auth"])

  Route.post("/createrepository", "RepositorieController.store").middleware(["auth"])
  Route.get("/showrepository", "RepositorieController.index").middleware(["auth"])
  Route.get("/takingrepository/:name", "RepositorieController.show").middleware(["auth"])
  Route.put("/alterrepository/:name", "RepositorieController.update").middleware(["auth"])
  Route.delete("/deleterepository/:name", "RepositorieController.destroy").middleware(["auth"])

  Route.get("/showfollower", "FollowerController.show").middleware(["auth"])

  Route.post("/createfollowing/:id", "FollowingController.store").middleware(["auth"])
  Route.get("/takingfollowing", "FollowingController.show").middleware(["auth"])

  Route.post("/stars/:id", "RepositorieStarController.store").middleware(["auth"])
  Route.get("/showstars/:id", "RepositorieStarController.show").middleware(["auth"])
}).prefix('api/v1')



