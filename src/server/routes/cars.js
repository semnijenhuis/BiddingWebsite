const express = require('express');
const router = express.Router();
const {StatusCodes,} = require('http-status-codes');
const auction = require ('../data/auction');
const admin = require ('../data/admin');
const carCreation = require ('../data/cars');

router.get('/',(req,res) =>{
    console.log("good")
    const userCopy = JSON.parse(JSON.stringify(auction.cars));
    res
        // .status(200)

        .send(userCopy.map(admin.filterCar));
});

router.get('/refresh',(req,res) =>{
    admin.refreshWinners();
    const userCopy = JSON.parse(JSON.stringify(auction.cars));
    res
        .status(200)
        .send(userCopy.map(admin.filterCar));
});

router.get('/:id',(req,res) => {
const id = parseInt(req.params.id);

if(id){
 const car = auction.cars.find(element => element.id === id);
    if(car){
        res
            .status(200)
            .send(car);
    }
    else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send( `car (id: ${id}) not found`)
        ;
    }
}

});

router.get('/:id/winning',(req,res) => {
    const id = parseInt(req.params.id);

    if(id){
        let car = auction.cars.find(element => element.id === id);

        let price = 0;
        let winner;
            for (let i = 0; i <car.bids.length; i++){
                if (car.bids[i].offer > price){
                    price = car.bids[i].offer
                    winner = car.bids[i].user
                }
            }
        if(car){
            res
                .status(200)
                .send(`the winner at the moment is ${winner} with a bid of $${price}`);
        }
        else {
            res
                .status(StatusCodes.NOT_FOUND)
                .send( `car (id: ${id}) not found`)
            ;
        }
    }

});

router.post('/',(req, res) => {

    const new_car = new carCreation.createCar(

        admin.randomCarID(),
        req.body.brand,
        req.body.model,
        req.body.bodyType,
        req.body.buildYear,
        req.body.auctionEndDate,

        req.body.auctionEndTime,
        req.body.price,


        req.body.owner,
        req.body.description);

    auction.cars.push(new_car);

    res
        .status(200)
        .send(new_car)

});

router.put('/:id',(req,res) => {
    const id = parseInt(req.params.id);


    if(id){
        const car = auction.cars.find(element => element.id === id);
        if(car){
            car.brand = req.body.brand;
            car.model = req.body.model;
            car.auctionEndDateYear = req.body.auctionEndDateYear;
            car.auctionEndDateMonth = req.body.auctionEndDateMonth;
            car.auctionEndDateDay = req.body.auctionEndDateDay;
            car.price = req.body.price;
            car.auctionEndDate = new Date(parseInt(req.body.auctionEndDateYear),parseInt(req.body.auctionEndDateMonth),parseInt(req.body.auctionEndDateDay))

            res
                .status(200)
                .send(car);
        }
        else {
            res
                .status(StatusCodes.NOT_FOUND)
                .send( `car (id: ${id}) not found`)
            ;
        }
    }

});

router.delete('/:id',(req,res) =>{
    const id = parseInt(req.params.id) ;

    if(id){
        const car = auction.cars.find(element => element.id === id);
        if(car){
            const itemToDelete = auction.cars.indexOf(car)
             auction.cars.splice(itemToDelete,1);
            res
                .status(200)
                .send(auction.cars);
        }
        else {
            res
                .status(StatusCodes.NOT_FOUND)
                .send( `car (id: ${id}) not found`)
            ;
        }
    }
});

module.exports = router;

