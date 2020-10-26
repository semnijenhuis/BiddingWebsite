function createCar (id,brand,model,bodyType,buildYear,auctionEndDate,auctionEndTime,price,owner,description) {
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.bodyType = bodyType;
    this.buildYear = buildYear;
    this.price = price;
    this.auctionEndDate = auctionEndDate
    this.auctionEndTime = auctionEndTime
    this.owner = owner;
    this.description = description;
    this.bids = [];
}

module.exports.createCar = createCar;



