const User = require('../models/user')
const Car = require('../models/car')

module.exports = {

    // Use of async,await
    getUsers: async (req, res, next) => {
        const users = await User.find({})
        res.status(200).json(users)
    },

    addUser: async (req, res, next) => {
        const newUser = new User(req.body)
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
        const { userID } = req.params
        const newUser = req.body
        const result = await User.findByIdAndUpdate(userID, newUser)
        res.status(200).json({ success: "ture" })
    },

    updateUser: async (req, res, next) => {
        // req.body may contain all or any number of fields
        const { userID } = req.params
        const newUser = req.body
        const result = await User.findByIdAndUpdate(userID, newUser)
        res.status(200).json({ success: "ture" })
    },

    getUserCars: async (req, res, next) => {
        const { userID } = req.params
        const user = await User.findById(userID).populate('cars')
        console.log('user', user)
        res.status(200).json(user.cars)
    },

    addUserCar: async (req, res, next) => {
        const { userID } = req.params
        // Create a newCar
        const newCar = new Car(req.body)
        // Get user
        const user = await User.findById(userID)
        console.log("user", user)
        //Assign user as a car's seller
        newCar.seller = user
        // Save the car
        await newCar.save()
        // Add car to user's selling array 'cars'
        user.cars.push(newCar)
        // Save the user
        await user.save()
        res.status(201).json(newCar)
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