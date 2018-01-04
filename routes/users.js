const express = require('express')
// const router = express.Router()
const router  = require('express-promise-router')()

const UserController = require('../controllers/users')
const { validateParam, schemas } = require('../helpers/routeHelpers')

router.route('/')
    .get(UserController.getUsers)
    .post(UserController.addUser)

router.route('/:userID')
    .get(validateParam(schemas.idSchema,'userID'), UserController.getUser)
    .put(UserController.replaceUser)
    .patch(UserController.updateUser)

router.route('/:userID/cars')
    .get(UserController.getUserCars)
    .post(UserController.addUserCar)

module.exports = router