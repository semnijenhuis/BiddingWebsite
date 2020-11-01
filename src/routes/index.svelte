<script>


    import {onMount} from "svelte";


    import {goto} from "@sapper/app";
    import {get} from "svelte/store";
    import {store} from "../store/store";

    let showModal = false;
    let find = 0;
    let searchTerm = "";
    let searchBodyType;
    let cars = [];
    let error;
    let valueMin = 0
    let valueMax = 0
    let carID;
    let choosenCar;
    let choosenBids = []
    let tokenJson = get(store).token;
    let searchList = []
    let maxCar = 100
    let minCar = 0
    let amount;
    let newBid = {
        "user": "",
        "offer": "",
        "offertime": ""
    }

    console.log(tokenJson)

    function checkPrices() {
        for (let i = 0; i < cars.length; i++) {
            let checkCar = cars[i]
            if (checkCar.price > maxCar) {
                maxCar = checkCar.price
            }
        }
    }

    const addBid = async (amount) => {
        console.log("starting to bid")

        const response = await fetch(`/cars/${carID}/bid`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': 'Bearer ' + tokenJson
            },

            body: JSON.stringify({offer: amount})
        });


        if (response.status === 200) {
            let newbid = await response.json()

            let user = newbid.user
            let offer = newbid.offer
            let offertime = newbid.offertime

            newBid.user = user
            newBid.offer = offer
            newBid.offertime = offertime

            choosenBids = [...choosenBids, newbid]
            choosenCar.price = newbid.offer


            cars = cars

            offer = ""
        } else {

            error = await response.json();
            alert(error.msg)
            console.log(error)
            showModal = false
        }
    }

    function pressedCar(choosen) {
        console.log("pressed car")
        showModal = true
        choosenCar = choosen
        choosenBids = choosen.bids
        carID = choosen.id
    }

    async function refreshCars() {
        console.log("refresh cars " + find)

        const response = await fetch('/cars', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': 'Bearer ' + tokenJson
            },
        });
        cars = await response.json();
        checkPrices()
        valueMax = maxCar

    }

    onMount(async () => {

        await refreshCars()


    });

    const getCar = async (e) => {

        e.preventDefault();
        carID = e;

        const response = await fetch(`/cars/${carID}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': 'Bearer ' + tokenJson
            },
        });

        if (response.status === 200) {
            const token = await response.json();
            console.log(token)
            goto(`/cars/${carID}`)

        } else {
            error = await response.json();
            console.log(error)
        }
    }

    const findItem = async (e) => {
        e.preventDefault();
        console.log("findItem")
        console.log(searchTerm)

        if (searchTerm) {
            const response = await fetch(`/filter/search/${searchTerm}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'authorization': 'Bearer ' + tokenJson
                },
            });
            cars = await response.json();
        }
    }

</script>

<svelte:head>
    <title>Sapper project template</title>
</svelte:head>

<label>
    <h1>Min</h1>
    <input type=number bind:value={valueMin} min={minCar} max={maxCar}>
    <input type=range bind:value={valueMin} min={minCar} max={maxCar}>
    <h1>max</h1>
    <input type=number bind:value={valueMax} min={minCar} max={maxCar}>
    <input type=range bind:value={valueMax} min={minCar} max={maxCar}>
</label>

<input class="auction_bid_amount" type="text" placeholder="search" bind:value={searchTerm}/><br/>
<button on:click="{findItem}">find car</button>
<button on:click="{refreshCars}">reset</button>

{#if showModal}
    <div class="row">
        <div class="cardBig">
            <h1 class="auction_title">{choosenCar.brand} {choosenCar.model}</h1>
            <p class="auction_description">
                {choosenCar.description}
            </p>
            <h3> Bid now on this {choosenCar.brand} {choosenCar.model} {choosenCar.bodyType} from {choosenCar.brand}
                above ${choosenCar.price}</h3>
            <form id="auctionBid" method="" action="/">
                <input class="auction_bid_amount" type="text" placeholder="amount" bind:value={amount}/><br/>
                <button on:click|preventDefault={addBid(amount)}>Bid</button>
                <span id="errorBid"></span>
            </form>

            <div class="auction_detail_bid_list">
                <h2>Bids</h2>
                <table>
                    <tr>
                        <th> Offer</th>
                        <th> User</th>
                        <th> Time</th>
                    </tr>
                    {#each choosenBids as bid }
                        <tr>
                            <td class="auction_detail_bid_price">${bid.offer}</td>
                            <td class="auction_detail_bid_user">{bid.user}</td>
                            <td class="auction_detail_bid_time">{bid.offertime}</td>
                        </tr>
                    {/each}
                </table>
            </div>

            <button on:click={() => showModal = false}>close</button>
        </div>
    </div>
{/if}

<div class="row">
    {#each cars as car}
        {#if car.price >= valueMin}
            {#if car.price <= valueMax}
                <div class="column">
                    <div class="card">

                        <h1 class="auction_title">{car.brand}</h1>

                        <p class="auction_description">
                            beautiful {car.brand} {car.model} {car.bodyType}
                            who has been build in {car.buildYear} with starting price of ${car.price}
                            we have {car.bids.length} bids and the auction will end on {car.auctionEndDate}
                            at {car.auctionEndTime} so give it a shot!
                        </p>

                        <div class="auction_bid">
                            <span class="auction_bid_price">${car.price}</span>
                            <span class="auction_bid_time">{car.auctionEndTime} hour</span>
                            <button on:click={pressedCar(car)}>
                                show modal
                            </button>
                        </div>

                    </div>
                </div>
            {/if}
        {/if}
    {/each}
</div>


<style>

    button {
        background-color: #ffffff; /* Green */
        border: none;
        color: #000000;
        padding: 9px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        -webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;
    }
    button:hover{
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24),0 17px 50px 0 rgba(0,0,0,0.19);
    }

    form {

        margin-bottom: 10px;
    }

    button {
        margin-bottom: 10px;
    }


    * {
        box-sizing: border-box;
    }


    /* Float four columns side by side */
    .column {
        float: left;
        width: 33%;
        margin-bottom: 20px;
        padding: 0 10px;
    }

    /* Remove extra left and right margins, due to padding in columns */
    .row {
        margin: 0 -5px;
    }

    /* Clear floats after the columns */
    .row:after {
        content: "";
        display: table;
        clear: both;
    }

    /* Style the counter cards */
    .card {
        box-shadow: 0 3px 2px rgba(0, 0, 0, 0.034),
        0 7px 5px rgba(0, 0, 0, 0.048),
        0 13px 10px rgba(0, 0, 0, 0.06),
        0 22px 18px rgba(0, 0, 0, 0.072),
        0 42px 33px rgba(0, 0, 0, 0.086),
        0 100px 80px rgba(0, 0, 0, 0.12);

        border-radius: 8px;
        padding: 16px;
        text-align: center;
        background-color: #f1f1f1;
    }

    .cardBig {
        box-shadow: 0 3px 2px rgba(0, 0, 0, 0.034),
        0 7px 5px rgba(0, 0, 0, 0.048),
        0 13px 10px rgba(0, 0, 0, 0.06),
        0 22px 18px rgba(0, 0, 0, 0.072),
        0 42px 33px rgba(0, 0, 0, 0.086),
        0 100px 80px rgba(0, 0, 0, 0.12);
        border-radius: 8px;
        padding: 16px;
        text-align: center;
        margin-bottom: 20px;
        margin-top: 20px;
        background-color: #f1f1f1;
    }

    /* Responsive columns - one column layout (vertical) on small screens */
    @media screen and (max-width: 600px) {
        .column {
            width: 100%;
            display: block;
            text-align: center;
            margin-bottom: 20px;
        }
    }


    table th {
        padding-top: 1rem;
        padding-bottom: 1rem;
        text-align: center;
        background-color: #b50606;
        color: white;
    }

    table tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    table tr:hover {
        background-color: #ddd;
    }

    table td, table th {
        border: 1px solid #ddd;
        padding: 0.5rem;
        text-align: center;
    }


</style>
