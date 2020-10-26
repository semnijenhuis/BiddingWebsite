const express = require(`express`);
const router = express.Router();
const {StatusCodes,} = require('http-status-codes');
const auction = require ('../data/auction');
const carCreation = require ('../data/cars');
let filterCarList = [];

router.get('/brand/:filter',(req,res) => {
    const filter = req.params.filter;
    filterCarList = [];

    for (let i = 0; i < auction.cars.length; i++) {
        if(auction.cars[i].brand.toUpperCase() === filter.toUpperCase()) {
            filterCarList.push(auction.cars[i]);
        }
    }

    if(filterCarList.length > 0){
        res
            .status(200)
            .send(filterCarList);
    }
    else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send( `cant find ${filter}, try again`)
        ;
    }
});

router.get('/model/:filter',(req,res) => {
    const filter = req.params.filter;
    filterCarList = [];

    for (let i = 0; i < auction.cars.length; i++) {
        if(auction.cars[i].model.toUpperCase() === filter.toUpperCase()) {
            filterCarList.push(auction.cars[i]);
        }
    }

    if(filterCarList.length > 0){
        res
            .status(200)
            .send(filterCarList);
    }
    else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send( `cant find a "${filter}", try again`)
        ;
    }
});

router.get('/price/max/:filter',(req,res) => {
    const filter = parseInt(req.params.filter);
    filterCarList = [];

    for (let i = 0; i < auction.cars.length; i++) {
        if(auction.cars[i].price <= filter) {
            filterCarList.push(auction.cars[i]);
        }
    }

    if(filterCarList.length > 0){
        res
            .status(200)
            .send(filterCarList);
    }
    else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send( `cant find car below $${filter}, try again`)
        ;
    }
});

router.get('/price/min/:filter',(req,res) => {
    const filter = parseInt(req.params.filter);
    filterCarList = [];

    for (let i = 0; i < auction.cars.length; i++) {
        if(auction.cars[i].price >= filter) {
            filterCarList.push(auction.cars[i]);
        }
    }

    if(filterCarList.length > 0){
        res
            .status(200)
            .send(filterCarList);
    }
    else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send( `cant find car above $${filter}, try again`)
        ;
    }
});

router.get('/price/min/:filterMin/max/:filterMax',(req,res) => {
    const filterMin = parseInt(req.params.filterMin);
    const filterMax = parseInt(req.params.filterMax);
    filterCarList = [];

    for (let i = 0; i < auction.cars.length; i++) {
        if(auction.cars[i].price >= filterMin && auction.cars[i].price <= filterMax) {
            filterCarList.push(auction.cars[i]);
        }
    }

    if(filterCarList.length > 0){
        res
            .status(200)
            .send(filterCarList);
    }
    else {
        res
            .status(StatusCodes.NOT_FOUND)
            .send( `cant find car between $${filterMin} - $${filterMax} , try again`)
        ;
    }
});

router.get('/search/:filter',(req,res) => {
    const filter = req.params.filter;
    filterCarList = [];

    for (let i = 0; i < auction.cars.length; i++) {
        if(auction.cars[i].brand.toUpperCase() === filter.toUpperCase()
            ||
            auction.cars[i].model.toUpperCase() === filter.toUpperCase()
            ||
            auction.cars[i].price === parseInt(filter)
            ||
            auction.cars[i].buildYear === parseInt(filter)
            ||
            auction.cars[i].bodyType.toUpperCase() === filter.toUpperCase()
        ) {
            filterCarList.push(auction.cars[i]);
        }
    }

    if(filterCarList.length > 0){
        res
            .status(200)
            .send(filterCarList);
    }
    else {
        const new_car = new carCreation.createCar(0,`sorry couldnt find ${filter}`);
        filterCarList.push(new_car)
        res
            .status(200)
            .send(filterCarList);;
    }
});

module.exports = router;