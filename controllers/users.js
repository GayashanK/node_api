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

    // Use of promises
    index: (req, res, next) => {
        User.find({})
            .then(users => {
                res.status(200).json(users);
            })
            .catch(err => {
                next(err);
            });
    },

    newUser: (req, res, next) => {
        const newUser = new User(req.body);
        newUser.save()
            .then(user => {
                res.status(201).json(user);
            })
            .catch(err => {
                next(err);
            });
    }
};

/*
    We can interact with mongoose with 3 diffent ways :
    1) Callbacks
    2) Promises
    3) Async/Await (Promises)
*/