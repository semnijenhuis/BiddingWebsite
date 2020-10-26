const bcrypt = require("bcrypt");
const  { v4:uuid4 } = require (`uuid`);
const saltRounds = 10;
const generatePasswordHash = (plainPassword => {return bcrypt.hashSync(plainPassword, saltRounds);})

function createUser(id,username,email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = generatePasswordHash(password);
    this.secret = uuid4();
    this.roles = [];
    this.auctionWon = [];
    this.myBids = [];
}

module.exports =  {

    createUser

};