<script>


    import {onMount} from "svelte";
    import {goto} from "@sapper/app";
    import {get} from "svelte/store";
    import {store} from "../store/store";

    let cars = [];
    let editAuction = false;
    let choosenCar;
    let brand;
    let model;
    let bodyType;
    let description;
    let buildYear;
    let startingPrice;
    let auctionEndDate;
    let auctionEndTime;
    let carID;
    let error;
    let tokenJson = get(store).token;

    async function getCars() {
        const response = await fetch('/cars', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            },

        });
        cars = await response.json();
        console.log(cars)
        console.log("end");

    }

    onMount(async () => {
        console.log("start")

        await getCars()
    });

    async function pressedCar(choosen) {
        console.log(choosen)
        carID = choosen.id
        console.log(carID)


        const response = await fetch(`/cars/${carID}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': 'Bearer ' + tokenJson
            },

        });
        if (response.status === 200) {
            let newcars = await response.json()
            cars = newcars;


        } else {
            let error = await response.json()
            console.log(error.msg)
            alert(error.msg)
        }


    }

    async function updateCar(choosenCar) {
        let choosenCarID = choosenCar.id
        console.log(choosenCarID)
        console.log("update car")


        const response = await fetch(`/cars/${choosenCarID}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': 'Bearer ' + tokenJson
            },
            body: JSON.stringify({
                brand: choosenCar.brand,
                model: choosenCar.model,
                bodyType: choosenCar.bodyType,
                description: choosenCar.description,
                buildYear: choosenCar.buildYear,
                startingPrice: choosenCar.startingPrice,
                auctionEndDate: choosenCar.auctionEndDate,
                auctionEndTime: choosenCar.auctionEndTime
            })
        });
        if (response.status === 200) {
            cars = cars
            editAuction = false
            console.log(choosenCar)
            console.log("update went well")
        } else {

            error = await response.json();
            alert(error.msg)
            console.log(error)
        }


    }

    const addCar = async (e) => {
        e.preventDefault();

        const response = await fetch('/cars', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': 'Bearer ' + tokenJson
            },
            body: JSON.stringify({
                brand: brand,
                model: model,
                bodyType: bodyType,
                description: description,
                buildYear: buildYear,
                startingPrice: startingPrice,
                auctionEndDate: auctionEndDate,
                auctionEndTime: auctionEndTime
            })
        });

        if (response.status === 200) {
            // const token = await response.json();
            goto('/')

        } else {
            error = await response.json();
            alert(error.msg)
            console.log(error)
        }
    }

    function editCar(car) {
        console.log("pressed car")
        editAuction = true
        choosenCar = car
    }


</script>


<svelte:head>
    <link rel="stylesheet" href="public/styles.css">
    <title>Sapper project template</title>
</svelte:head>

{#if editAuction}
    <div class="column">
        <form class="login_form" method="" action="">
            <h1 class="auction_title">Add an auction</h1>
            <input type="text" placeholder="Brand" name="brand" bind:value={choosenCar.brand}/><br/>
            <input type="text" placeholder="Model" name="model" bind:value={choosenCar.model}/><br/>
            <input type="text" placeholder="Body type" name="bodyType" bind:value={choosenCar.bodyType}/><br/>
            <input type="text" placeholder="Description" name="description" bind:value={choosenCar.description}/><br/>
            <input type="number" placeholder="Build year" name="buildYear" bind:value={choosenCar.buildYear}/><br/>
            <input type="number" placeholder="Starting price" name="startingPrice"
                   bind:value={choosenCar.startingPrice}/><br/>
            <input type="date" placeholder="End date" name="date" bind:value={choosenCar.auctionEndDate}/><br/>
            <input type="time" placeholder="End time" name="time" bind:value={choosenCar.auctionEndTime}/><br/>
            <input on:click|preventDefault={updateCar(choosenCar)} value="Edit"/>
        </form>
    </div>
{/if}

<div class="row">
    <div id="adminList" class="column">
        <h1 class="auction_title">Add, update or delete auctions</h1>
        <table>
            <tr>
                <th>Name</th>
                <th>End time</th>
                <th>Actions</th>
            </tr>
            {#each cars as car}
                <tr>
                    <td>{car.brand} {car.model}</td>
                    <td>{car.auctionEndTime}</td>
                    <td>
                        <button on:click={editCar(car)}> editAuction</button>
                        <button on:click={pressedCar(car)}> Delete</button>
                    </td>
                </tr>
            {/each}
        </table>
    </div>


    <div class="column">
        <form class="editForm" method="" action="">
            <h1 class="auction_title">Add an auction</h1>
            <input type="text" placeholder="Brand" name="brand" bind:value={brand}/><br/>
            <input type="text" placeholder="Model" name="model" bind:value={model}/><br/>
            <input type="text" placeholder="Body type" name="bodyType" bind:value={bodyType}/><br/>
            <input type="text" placeholder="Description" name="description" bind:value={description}/><br/>
            <input type="number" placeholder="Build year" name="buildYear" bind:value={buildYear}/><br/>
            <input type="number" placeholder="Starting price" name="startingPrice" bind:value={startingPrice}/><br/>
            <input type="date" placeholder="End date" name="date" bind:value={auctionEndDate}/><br/>
            <input type="time" placeholder="End time" name="time" bind:value={auctionEndTime}/><br/>
            <input type="submit" on:click={addCar} value="Add"/>
        </form>
    </div>

</div>

<style>
    table th {
        padding-top: 1rem;
        padding-bottom: 1rem;
        text-align: center;
        background-color: #ab0b0b;
        color: white;
    }

    table tr:nth-child(even){ background-color: #f2f2f2; }

    table tr:hover { background-color: #ddd; }

    table td, table th {
        border: 1px solid #ddd;
        padding: 0.5rem;
        text-align: center;
    }
</style>