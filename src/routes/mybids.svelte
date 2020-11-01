<script>

    import {get} from "svelte/store";
    import {store} from "../store/store";
    import {onMount} from "svelte";

    let tokenJson = get(store).token;
    let myBids;
    let table = false
    let carID;
    let error;
    let offer;

    async function pressedBid(choosen) {
        carID = choosen.carID
        offer = choosen.offer
        table = false

        console.log(carID)
        console.log(offer)

        const response = await fetch(`/cars/${carID}/bid`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': 'Bearer ' + tokenJson
            },
            body: JSON.stringify({offer: offer})

        });
        if (response.status === 200) {
            const response = await fetch('/auth/mybids', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'authorization': 'Bearer ' + tokenJson
                },
            });
            myBids = await response.json();
            console.log(myBids)
            table = true


        } else {
            alert("you need to be logged in")
            error = await response.json();
            console.log(error)
        }


    }

    onMount(async () => {
        const response = await fetch('/auth/mybids', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'authorization': 'Bearer ' + tokenJson
            },
        });
        if (response.status === 200) {
            myBids = await response.json();
            console.log(myBids)
            table = true
        } else {
            error = await response.json();
            alert(error.msg)
            console.log(error)
        }
    });


</script>

<div class="row">
    <h1 class="auction_title">My bids</h1>
</div>
<div id="mybids_table" class="row">
    <table>
        <tr>
            <th>Car ID</th>
            <th>Price</th>
            <th>Time</th>
            <th>Is best bid?</th>
            <th>Remove</th>
        </tr>
        {#if table}
            {#each myBids as bid}
                <tr>
                    <td>{bid.carID}</td>
                    <td>{bid.offer}</td>
                    <td>{bid.offertime}</td>
                    <td>{bid.bestBid}</td>
                    <td>
                        <button on:click={() => pressedBid(bid)}> Delete</button>
                    </td>
                </tr>
            {/each}
        {/if}
    </table>
</div>


<style>
    table th {
        padding-top: 1rem;
        padding-bottom: 1rem;
        text-align: center;
        background-color: #ab0b0b;
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