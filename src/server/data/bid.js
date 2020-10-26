function makeABid (carID,user, offer,offertime,bestBid) {
    this.carID = carID;
    this.user = user;
    this.offer = offer;
    this.offertime = d.getHours() + ":" + d.getMinutes()
    this.bestBid = true;


}


let d = new Date();


module.exports.makeABid = makeABid;