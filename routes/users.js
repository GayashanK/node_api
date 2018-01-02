const express = require('express');
// const router = express.Router();
const router  = require('express-promise-router')();

const UserController = require('../controllers/users')

router.route('/')
    .get(UserController.getUsers)
    .post(UserController.addUser);

router.route('/:userID')
    .get(UserController.getUser)
    .put(UserController.replaceUser)
    .patch(UserController.updateUser);

module.exports = router;