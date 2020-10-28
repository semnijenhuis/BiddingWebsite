const express = require('express');
const router = express.Router();
const {StatusCodes,} = require('http-status-codes');
const auction = require ('../data/auction');
const admin = require ('../data/admin');
const bidCreation = require ('../data/bid');

router.get('/:id/bids',(req,res) => {
    const id = parseInt(req.params.id);

    if(id){
        const car = auction.cars.find(element => element.id === id);
        if(car){
            res
                .status(200)
                .send(car.bids);
        }
        else {
            res
                .status(StatusCodes.NOT_FOUND)
                .send( `car (id: ${id}) not found`)
            ;
        }
    }

});

router.post('/:id/bid',(req,res) => {
    const id = parseInt(req.params.id);
    const offer = parseInt(req.body.offer);
    const  bearerHeader = req.headers[`authorization`];
    let user;
    let car;
    let newBid;
    console.log(req)
    console.log(req.headers)

    if (bearerHeader) {
        console.log("1")
        const token = bearerHeader.split(' ')[1]
        const tokenPayLoad = admin.isTokenValid(token);

        if(tokenPayLoad) {
            console.log("2")
            user = auction.users.find(element => element.username === tokenPayLoad.username);
            if(user.username != null){
                console.log("3")
                car = auction.cars.find(element => element.id === id);
                if(car){
                    console.log("4")

                    const lastOffer = car.bids[car.bids.length -1];

                    if(lastOffer){
                        console.log("5")
                        if(offer > lastOffer.offer){
                            console.log("7")
                            const older = auction.users.find(element => element.username === lastOffer.user)
                            const itemToDelete = older.myBids.indexOf(lastOffer)
                            older.myBids[itemToDelete].bestBid = false;

                            newBid = new bidCreation.makeABid(car.id,user.username,offer);
                            car.price = offer;

                            user.myBids.push(newBid)
                            car.bids.push(newBid);
                            res
                                .status(200)
                                .send(car)

                        }

                        else {
                            console.log("8")

                            res
                                .status(404)
                                .send("offer to low")

                        }


                    }
                else {
                        console.log("9")
                        const newBid = new bidCreation.makeABid(user.username,offer);
                        car.price = offer;
                        user.myBids.push(newBid)
                        car.bids.push(newBid);
                        res
                            .status(200)
                            .send(car)
                    }



                }
                else {
                    console.log("10")
                    res
                        .status(StatusCodes.NOT_FOUND)
                        .send( `car (id: ${id}) not found`);
                }
            }
            else {
                console.log("11")
                res
                    .status(400)
                    .send({"msg": ",user cant be found"});
            }
        }
        else {
            console.log("11")
            res
                .status(400)
                .send({"msg": ",Your not logged in"});
        }
    }

    else {
        console.log("12")
        res
            .status(401)
            .alert("Log in first")

    }


});

router.delete('/:id/bid',(req,res) => {
    const id = parseInt(req.params.id);
    const offer = req.body.offer;
    console.log(offer)
    const  bearerHeader = req.headers[`authorization`];
    let user;
    let car;
    let foundOffer;

    if (bearerHeader) {
        console.log("1")
        const token = bearerHeader.split(' ')[1]
        const tokenPayLoad = admin.isTokenValid(token);

        if(tokenPayLoad) {
            console.log("2")
            user = auction.users.find(element => element.username === tokenPayLoad.username);
            if(user){
                console.log("3")
                car = auction.cars.find(element => element.id === id);
                const itemToDelete = car.bids.indexOf(offer)
                const itemToDeleteUser = user.myBids.indexOf(offer)

                user.myBids.splice(itemToDeleteUser,1)
                car.bids.splice(itemToDelete,1)

                res
                    .status(200)
                    .send(car.bids)
            }
            else {
                console.log("8")
                res
                    .status(400)
                    .send({"msg": "user couldn't been found"});
            }
        }
        else {
            console.log("9")
            res
                .status(401)
                .send({"msg": "Your not logged in"});
        }
    }
    else {
        console.log("10")
        res
            .status(401)
            .send({"msg": "No bareheaded"});
    }

});

module.exports = router;
