const express = require(`express`);
const router = express.Router();
const { v4:uuid4 } = require(`uuid`);
const auction = require ('../data/auction');
const admin = require ('../data/admin');

router.post('/',(req, res) => {
    const token = admin.login(req.body.username, req.body.password);

    if (token) {

        res.status(200)
        res.send({"token": token})

            // .setRequestHeader('authorization',"" + token)


    }
    else {
        res
            .status(400)
            .send({"msg" : " Bad request, required parameters missing"})
    }
});

router.get('/',(req, res) => {
    const  bearerHeader = req.headers[`authorization`];

    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1]
        const tokenPayLoad = admin.isTokenValid(token);

        if(tokenPayLoad) {
            const user = auction.users.find(element => element.username === tokenPayLoad.username);
            if(user){
                res
                    .status(200)
                    .send(user)
            }
        }
    }
    res
        .status(401)
        .send({"msg": "Empty bearerhead"});
});

router.get('/won',(req, res) => {
    const  bearerHeader = req.headers[`authorization`];

    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1]
        const tokenPayLoad = admin.isTokenValid(token);

        if(tokenPayLoad) {
            const user = auction.users.find(element => element.username === tokenPayLoad.username);
            if(user.auctionWon.length > 0){
                res
                    .status(200)
                    .send(user.auctionWon)
            }
            else {
                res
                    .status(204)
                    .send("won nothing")
            }
        }
        else {
            res
                .status(401)
                .send({"msg": "Authentication required"});
        }
    }
    res
        .status(401)
        .send({"msg": "Authentication required"});
});

router.get('/mybids',(req, res) => {

    const  bearerHeader = req.headers[`authorization`];

    console.log("1")
    if (bearerHeader) {
        console.log("2")
        const token = bearerHeader.split(' ')[1]


        const tokenPayLoad = admin.isTokenValid(token);



        if(tokenPayLoad) {
            console.log("3")
            const user = auction.users.find(element => element.username === tokenPayLoad.username);
            if(user.myBids.length > 0){

                res
                    .status(200)
                    .send(user.myBids)
            }
            else {
                console.log("5")
                res
                    .status(204)
                    .send("no bids here")
            }
        }
        else {
            console.log("6")
            res
                .status(401)
                .send({"msg": "No token Payload"});
        }
    }
    else {
        console.log("7")
        res
            .status(401)
            .send({"msg": "No header"});

    }
});

router.delete('/',(req, res) => {
    const  bearerHeader = req.headers[`authorization`];

    if (bearerHeader) {
        // const token = bearerHeader.split(' ')[1]
        // const tokenPayLoad = admin.isTokenValid(token);
        // const user = auction.users.find(element=> element.username === tokenPayLoad.username);

        //user.secret = uuid4();
        res
            .send("Logged out")
            .sendStatus(204);
    }
    else {res.send("no bearerheader")}

});

module.exports = router;