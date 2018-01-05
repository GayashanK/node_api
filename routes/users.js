const express = require('express')
// const router = express.Router()
const router  = require('express-promise-router')()

const UserController = require('../controllers/users')
const { validateParam, validateBody, schemas } = require('../helpers/routeHelpers')

router.route('/')
    .get(UserController.getUsers)
    .post(validateBody(schemas.userSchema), UserController.addUser)

router.route('/:userID')
    .get(validateParam(schemas.idSchema,'userID'), UserController.getUser)
    .put(
        [validateParam(schemas.idSchema,'userID'), validateBody(schemas.userSchema)],
        UserController.replaceUser
    )
    .patch(
        [validateParam(schemas.idSchema,'userID'), validateBody(schemas.userOptionalSchema)],
        UserController.updateUser
    )

router.route('/:userID/cars')
    .get(validateParam(schemas.idSchema,'userID'), UserController.getUserCars)
    .post(
        [validateParam(schemas.idSchema,'userID'), validateBody(schemas.carSchema)],
        UserController.addUserCar
    )

module.exports = router