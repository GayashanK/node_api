const User = require('../models/user');

module.exports = {

    // // Use of callbacks
    // index: (req, res, next) => {
    //     User.find({},(err, users) => {
    //         if(err) {
    //             next(err);
    //         }

    //         res.status(200).json(users);
    //     });
    // },

    // // Use of promises
    // index: (req, res, next) => {
    //     User.find({})
    //         .then(users => {
    //             res.status(200).json(users);
    //         })
    //         .catch(err => {
    //             next(err);
    //         });
    // },

    // Use of async,await

    index: async (req, res, next) => {
        const user = await User.find({});
        res.status(200).json(users);
    },

    newUser: async (req, res, next) => {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(201).json(user);
    }
};

/*
    We can interact with mongoose with 3 diffent ways :
    1) Callbacks
    2) Promises
    3) Async/Await (Promises)
*/