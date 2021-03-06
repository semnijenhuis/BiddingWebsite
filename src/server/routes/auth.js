const express = require(`express`);
const router = express.Router();
const {v4: uuid4} = require(`uuid`);
const auction = require('../data/auction');
const admin = require('../data/admin');

router.post('/', (req, res) => {
    const token = admin.login(req.body.username, req.body.password);

    if (token) {
        res.status(200)
        res.send({"token": token})
    } else {
        res
            .status(400)
            .send({"msg": " Bad request, required parameters missing"})
    }
});

router.get('/', (req, res) => {
    const bearerHeader = req.headers[`authorization`];

    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1]
        const tokenPayLoad = admin.isTokenValid(token);

        if (tokenPayLoad) {
            const user = auction.users.find(element => element.username === tokenPayLoad.username);
            if (user) {
                res
                    .status(200)
                    .send(user)
            }
        } else {
            res
                .status(401)
                .send({"msg": "Authentication required"});
        }
    } else {

        res
            .status(401)
            .send({"msg": "Empty bearerhead"});
    }

});

router.get('/won', (req, res) => {
    const bearerHeader = req.headers[`authorization`];

    if (bearerHeader !== "Bearer undefined") {
        const token = bearerHeader.split(' ')[1]
        const tokenPayLoad = admin.isTokenValid(token);

        if (tokenPayLoad) {
            const user = auction.users.find(element => element.username === tokenPayLoad.username);
            if (user.auctionWon.length > 0) {
                res
                    .status(200)
                    .send(user.auctionWon)
            } else {
                res
                    .status(204)
                    .send("won nothing")
            }
        } else {
            res
                .status(401)
                .send({"msg": "Authentication required"});
        }
    } else {

        res
            .status(401)
            .send({"msg": "Authentication required"});
    }

});

router.get('/mybids', (req, res) => {

    const bearerHeader = req.headers[`authorization`];

    if (bearerHeader !== "Bearer undefined") {

        const token = bearerHeader.split(' ')[1]

        const tokenPayLoad = admin.isTokenValid(token);

        if (tokenPayLoad) {

            const user = auction.users.find(element => element.username === tokenPayLoad.username);
            if (user.myBids.length > 0) {

                res
                    .status(200)
                    .send(user.myBids)
            } else {

                res
                    .status(204)
                    .send({"msg": "no bids here"})
            }
        } else {

            res
                .status(401)
                .send({"msg": "No token Payload"});
        }
    } else {

        res
            .status(401)
            .send({"msg": "Header is empty, you need to log in"});

    }
});

router.delete('/', (req, res) => {
    const bearerHeader = req.headers[`authorization`];

    if (bearerHeader) {
        // const token = bearerHeader.split(' ')[1]
        // const tokenPayLoad = admin.isTokenValid(token);
        // const user = auction.users.find(element=> element.username === tokenPayLoad.username);

        //user.secret = uuid4();
        res
            .send("Logged out")
            .sendStatus(204);
    } else {
        res.send("no bearerheader")
    }

});

module.exports = router;