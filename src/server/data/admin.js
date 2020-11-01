const bcrypt = require(`bcrypt`);
const auction = require('./auction');
const jwt = require(`jsonwebtoken`);

// check if the token is valid
function isTokenValid(token) {
    const tokenPayLoad = jwt.decode(token);
    const user = auction.users.find(element => element.username === tokenPayLoad.username);
    if (user) {
        try {
            return jwt.verify(token, user.secret);
        } catch (e) {
            return false;
        }
    }
    return false;
}

// login function
const login = (username, password) => {
    const user = auction.users.find(element => element.username === username);

    if (user && bcrypt.compareSync(password, user.password)) {
        return jwt.sign({
            username: user.username,
            roles: user.roles
        }, user.secret);
    }
    return false;
};

// filter user
function filterUser(user) {
    const {secret, password, ...resource} = user;
    return resource;
}

// filters the cars
function filterCar(car) {
    const {auctionEndDateYear, auctionEndDateMonth, auctionEndDateDay, user, ...resource} = car;
    return resource;
}

// helps you find a user
function findUser(username) {

    if (username) {
        const user = auction.users.find(element => element.username === username);
        if (user) {
            return user;
        } else {
            return `user ${username} cannot be found`
                ;
        }
    }
}

// creates random number for car ID
function randomCarID() {
    let numb = Math.floor((Math.random() * 10000000) + 1);
    const car = auction.cars.find(element => element.id === numb);
    if (car) {
        numb = Math.floor((Math.random() * 10000000) + 1);
    }
    return numb
}

// creates random number for user ID
function randomUserID() {
    let numb = Math.floor((Math.random() * 10000000) + 2);
    const car = auction.users.find(element => element.id === numb);
    if (car) {
        numb = Math.floor((Math.random() * 10000000) + 1);
    }
    return numb
}

// looks if any auction is passed date and checks who won
function refreshWinners() {
    let d = new Date();
    const today = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
    let car;
    for (let i = 0; i < auction.cars.length; i++) {
        if (auction.cars[i].auctionEndDate < today) {
            car = auction.cars[i];
            let price = 0;
            let winner;

            for (let j = 0; j < car.bids.length; j++) {
                if (car.bids[j].offer > price) {
                    price = car.bids[j].offer
                    winner = car.bids[j]
                }
            }


            if (winner) {
                const user = auction.users.find(element => element.username === winner.user)
                user.auctionWon.push(car)
                const itemToDelete = auction.cars.indexOf(car)
                auction.cars.splice(itemToDelete, 1);
            }
        } else {

            const car2 = auction.cars[i];
            let price = 0;
            let winning;

            for (let h = 0; h < car2.bids.length; h++) {
                if (car2.bids[h].offer > price) {
                    price = car2.bids[h].offer
                    winning = car2.bids[h];
                }

            }


            if (winning) {
                const user = auction.users.find(element => element.username === winning.user)

                for (let j = 0; j < user.myBids.length; j++) {
                    if (price === user.myBids[j].offer) {
                        user.myBids[j].bestBid = true;
                        price = 0;
                    }

                }


            }


        }


    }
}


module.exports = {

    isTokenValid, login, filterUser, findUser, filterCar, randomCarID, randomUserID, refreshWinners

}