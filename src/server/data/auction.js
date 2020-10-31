
const carCreation = require ('./cars');
const userCreation = require ('./users');
const bidCreation = require ('./bid');

const admin = new userCreation.createUser(0,"admin","admin@admin","admin",["admin"]);
admin.roles.push("admin")
const owner1 = new userCreation.createUser(1,"sem","sem@crazybids.nl","test",["user","student"]);
owner1.roles.push("user")
owner1.roles.push("student")
const owner2 = new userCreation.createUser(2,"stephen","stephen@crazybids.nl","tom123",["admin","boss"]);
owner2.roles.push("admin")
owner2.roles.push("boss")
const owner3 = new userCreation.createUser(3,"alex","alex@crazybids.nl","alex123",["user","tester"]);
owner3.roles.push("user")
owner3.roles.push("tester")
const owner4 = new userCreation.createUser(4,"victor","victor@crazybids.nl","victor123",["user"]);
owner4.roles.push("user")

const car1 = new carCreation.createCar(1,"Audi", "A8","Sedan",2006, "2020-10-30", "12:00",1000,owner1.username,"The Audi A8 is a four-door, full-size, luxury sedan manufactured and marketed by the German automaker Audi since 1994. Succeeding the Audi V8, and now in its fourth generation, the A8 has been offered with both front- or permanent all-wheel drive—and in short- and long-wheelbase variants. The first two generations employed the Volkswagen Group D platform, with the current generation deriving from the MLB platform. After the original model's 1994 release, Audi released the second generation in late 2002, the third in late 2009, and the fourth and current iteration in 2017.");
const car2 = new carCreation.createCar(2,"Mazda", "MX-5","Cabrio", 2008, "2021-11-14","13:00",2000, owner2.username,"The Mazda MX-5 is a lightweight two-passenger roadster sports car manufactured and marketed by Mazda with a front mid-engine, rear-wheel-drive layout. The convertible is marketed as the Mazda Roadster (マツダ・ロードスター, Matsuda Rōdosutā) or Eunos Roadster (ユーノス・ロードスター, Yūnosu Rōdosutā) in Japan, and as the Mazda MX-5 Miata (/miˈɑːtə/) in North America, where it is widely known as the Miata.");
const car3 = new carCreation.createCar(3,"Volvo", "S80","Sedan", 2007, "2021-12-10", "14:00",3000, owner3.username,"The Volvo S80 is an executive car produced by the Swedish manufacturer Volvo Cars from 1998 to 2016 across two generations. It took the place of the rear-wheel-drive S90 as Volvo's flagship sedan. The second generation (2006–2016) was released in 2006 as a model year 2007 car. It has an estate version, the third generation of the Volvo V70. In June 2007, the S80 scored the highest \"good\" rating in the Insurance Institute for Highway Safety (IIHS) crash test performance for frontal, side, and rear impacts,[2] earning it the IIHS Top Safety Pick.");
const car4 = new carCreation.createCar(4,"VW", "Golf","Hatchback",2012, "2020-12-03","15:00",4000, owner4.username,"The Volkswagen Golf  is a compact car produced by the German automotive manufacturer Volkswagen since 1974, marketed worldwide across eight generations, in various body configurations and under various nameplates – such as the Volkswagen Rabbit in the United States and Canada (Mk1 and Mk5), and as the Volkswagen Caribe in Mexico (Mk1).");
const car5 = new carCreation.createCar(5,"Audi", "A6","Stationwagen", 2020, "2020-11-17","12:00",5000, owner1.username,"The Audi A6 is an executive car made by the German automaker Audi. Now in its fifth generation, the successor to the Audi 100 is manufactured in Neckarsulm, Germany, and is available in saloon and estate configurations, the latter marketed by Audi as the Avant. Audi's internal numbering treats the A6 as a continuation of the Audi 100 lineage, with the initial A6 designated as a member of the C4-series, followed by the C5, C6, C7, and the C8. The related Audi A7 is essentially a Sportback (fastback) version of the C7-series and C8-series A6 but is marketed under its own separate identity and model designation.");
const car6 = new carCreation.createCar(6,"Ford", "F150","Pickup", 2020, "2020-10-30","23:59",6000, owner2.username,"The twelfth generation F-150 was introduced for the 2009 model year as an update of the Ford full-size truck platform. Similar to its predecessor, these trucks are distinguished by their Super Duty-style grilles and head lamps; standard cab models again have two-doors instead of four. The FlareSide bed was continued until 2010, dropped along with the manual gearbox; outside of Mexico, the Lincoln Mark LT was replaced by the F-150 Platinum. A new model for 2010 included the SVT Raptor, a dedicated off-road pickup.");


// const bid1 = new bidCreation.makeABid(1,owner1.username,1000);
// const bid2 = new bidCreation.makeABid(2,owner2.username,5000);
// const bid3 = new bidCreation.makeABid(3,owner3.username,3000);
// const bid4 = new bidCreation.makeABid(4,owner4.username,6000);
// const bid5 = new bidCreation.makeABid(5,owner1.username,6000);
// const bid6 = new bidCreation.makeABid(6,owner2.username,6000);
//
// car1.bids.push(bid1)
// car2.bids.push(bid2)
// car3.bids.push(bid3)
// car4.bids.push(bid4)
// car5.bids.push(bid5)
// car6.bids.push(bid6)
//
//
// owner1.myBids.push(bid1)
// owner2.myBids.push(bid2)
// owner3.myBids.push(bid3)
// owner4.myBids.push(bid4)
// owner1.myBids.push(bid5)
// owner2.myBids.push(bid6)


const cars = [car1,car2,car3,car4,car5,car6]
const users = [owner1,owner2,owner3,owner4,admin]



module.exports = {

    cars,
    users

}