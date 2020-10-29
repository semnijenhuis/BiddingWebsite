const express = require('express')


const app = express()

const carsRouter = require('./routes/cars')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const bidsRouter = require('./routes/bids')
const filterRouter = require('./routes/filter')

const init = () => {

    app.use(express.json());

    app.use('/cars',carsRouter);
    app.use('/users',usersRouter);
    app.use('/auth',authRouter);
    app.use('/cars',bidsRouter);
    app.use('/filter',filterRouter);


    return app;
}

module.exports = init;

