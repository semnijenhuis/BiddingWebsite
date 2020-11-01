const express = require(`express`);
const router = express.Router();
const {StatusCodes,} = require('http-status-codes');
const auction = require('../data/auction');
const admin = require('../data/admin');
const userCreation = require('../data/users');

router.get('/', (req, res) => {
    const userCopy = JSON.parse(JSON.stringify(auction.users));
    res
        .status(200)
        .send(userCopy.map(admin.filterUser));
});

router.get('/:username', (req, res) => {
    const username = req.params.username;


    if (username) {
        const user = auction.users.find(element => element.username === username);
        if (user) {
            res
                .status(200)
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .send(`user ${username} cannot be found`)
            ;
        }
    }

});

router.post('/', (req, res) => {
    const userData = req.body;
    let free = false;
    let newUser;

    if (userData) {

        for (let i = 0; i < auction.users.length; i++) {
            if (userData.username === auction.users[i].username) {
                free = true
            }

        }

        if (free === false) {
            newUser = new userCreation.createUser(admin.randomUserID(), userData.username, userData.email, userData.password, userData.roles);
            newUser.roles.push("user")
            auction.users.push(newUser);
            res
                .send(newUser)
                .status(200)
        } else {

            res
                .status(400)
                .body({"msg": "already excist"})
        }

    } else {
        res
            .status(204)
            .send({"msg": " empty body"});
    }
});

module.exports = router;