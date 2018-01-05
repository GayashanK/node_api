const User = require('../models/user')
const Car = require('../models/car')

module.exports = {

    // Use of async,await
    getUsers: async (req, res, next) => {
        const users = await User.find({})
        res.status(200).json(users)
    },

    addUser: async (req, res, next) => {
        const newUser = new User(req.value.body)
        const user = await newUser.save()
        res.status(201).json(user)
    },

    getUser: async (req, res, next) => {
        const { userID } = req.value.params
        const user = await User.findById(userID)
        res.status(200).json(user)
    },

    replaceUser: async (req, res, next) => {
        // Enforce that req.body must contain all the fields
        const { userID } = req.value.params
        const newUser = req.value.body
        const result = await User.findByIdAndUpdate(userID, newUser)
        res.status(200).json({ success: "ture" })
    },

    updateUser: async (req, res, next) => {
        // req.body may contain all or any number of fields
        const { userID } = req.value.params
        const newUser = req.value.body
        const result = await User.findByIdAndUpdate(userID, newUser)
        res.status(200).json({ success: "ture" })
    },

    getUserCars: async (req, res, next) => {
        const { userID } = req.value.params
        const user = await User.findById(userID).populate('cars')
        console.log('user', user)
        res.status(200).json(user.cars)
    },

    addUserCar: async (req, res, next) => {
        const { userID } = req.value.params
        const user = await User.findById(userID)
        const newCar = new Car(req.value.body)
        newCar.seller = user
        user.cars.push(newCar)
        await newCar.save()
        await user.save()
        res.status(201).json(user)
    }
}

/*
    We can interact with mongoose with 3 diffent ways :
    1) Callbacks
    2) Promises
    3) Async/Await (Promises)

    // Use of callbacks
    getUsers: (req, res, next) => {
        User.find({},(err, users) => {
            if(err) {
                next(err)
            }
            res.status(200).json(users)
        })
    },

    // Use of promises
    getUsers: (req, res, next) => {
        User.find({})
            .then(users => {
                res.status(200).json(users)
            })
            .catch(err => {
                next(err)
            })
    },

    // Use of async,await
    getUsers: async (req, res, next) => {
        const users = await User.find({})
        res.status(200).json(users)
    },
*/