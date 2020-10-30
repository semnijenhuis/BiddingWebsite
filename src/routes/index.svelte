<script>


	import {onMount} from "svelte";


	import Modal from './Modal.svelte';


	import {goto} from "@sapper/app";
	import {get} from "svelte/store";
	import {store} from "../store/store";

	let showModal = false;
	let find = 0;
	let searchTerm;
	let cars = [];
	let error;
	let carID;
	let choosenCar;
	let tokenJson = get(store).token;
	let offer;

	const addBid = async  (e) => {
		console.log(offer)

		console.log("hello")

		const response = await  fetch(`/cars/${carID}/bid`, {
			method: "POST",
			headers: {
				'Content-Type' : 'application/json',
				'Accept': 'application/json',
				'authorization': 'Bearer '+ tokenJson
			},

			body: JSON.stringify({offer: offer})
		});


		if (response.status === 200) {
			choosenCar.bids = [...choosenCar.bids,offer]
			offer = ""
			showModal = true
		}
		else {

			error = await  response.json();
			alert("your not logged in")
			console.log(error)
			showModal = false
		}
	}

	async function pressedCar(choosen) {
		console.log("pressed car")
		showModal = true
		choosenCar = choosen
		carID = choosen.id
	}

	async function refreshCars() {
		console.log("refresh cars " +find)

		const response = await fetch('/cars', {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'authorization': 'Bearer '+ tokenJson
			},
		});
		cars = await response.json();
	}

	onMount(async () => {

		await refreshCars()

		});


	const getCar = async  (e) => {

		e.preventDefault();
		carID = e;

		const response = await  fetch(`/cars/${carID}`, {
			method: "GET",
			headers: {
				'Content-Type' : 'application/json',
				'Accept': 'application/json',
				'authorization': 'Bearer '+ tokenJson
			},
		});

		if (response.status === 200) {
			const token = await response.json();
			console.log(token)
			goto(`/cars/${carID}`)

		} else {
			error = await  response.json();
			console.log(error)
		}
	}

	const findItem = async  (e) => {
		e.preventDefault();
		console.log("findItem")
		console.log(searchTerm)

		if (searchTerm){
			const response = await fetch(`/filter/search/${searchTerm}`, {
				method: "GET",
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'authorization': 'Bearer '+ tokenJson
				},
			});
			cars = await response.json();
		}
	}



</script>

	<svelte:head>
		<title>Sapper project template</title>
	</svelte:head>


<form>
	<select>
		{#each cars as car}
			<option value={car}>
				{car.brand}
			</option>
		{/each}
	</select>
</form>

<form>
	<select>
		{#each cars as car}
			<option value={car}>
				{car.bodyType}
			</option>
		{/each}
	</select>
</form>

<form>
	<select>
		{#each cars as car}
			<option value={car}>
				{car.model}
			</option>
		{/each}
	</select>
</form>


<input class="auction_bid_amount" type="text" placeholder="search" bind:value={searchTerm}/><br />
<button on:click="{findItem}" >find car</button>
<button on:click="{refreshCars}" >reset</button>


<div class ="row">


	{#each cars as car}

			<section class="auction_box">

				<h1  class="auction_title">{car.brand}</h1>

				<p  class="auction_description">
					beautiful {car.brand} {car.model} {car.bodyType}
					who has been build in {car.buildYear} with starting price of ${car.price}
					we have {car.bids.length} bids and the auction will end on {car.auctionEndDate} at {car.auctionEndTime} so give it a shot!
				</p>

				<div class="auction_bid">
					<span  class="auction_bid_price">${car.price}</span>
					<span  class="auction_bid_time">{car.auctionEndTime} hour</span>
					<button on:click={pressedCar(car)} >
						show modal
					</button>
				</div>

			</section>
	{/each}


</div>


{#if showModal}
	<Modal>

		<h1 class="auction_title">{choosenCar.brand} {choosenCar.model}</h1>
		<p class="auction_description">
			{choosenCar.description}
		</p>

		<form id="auctionBid" method="" action="/">
			<input class="auction_bid_amount" type="text" placeholder="amount" bind:value={offer}/><br />
			<button on:click|preventDefault={addBid}>Bid</button>
			<span id="errorBid"></span>
		</form>

		<div class="auction_detail_bid_list">
			<h2>Bids</h2>
			<ul>
				{#each choosenCar.bids as bid }
					<li class="auction_detail_bid">
						<span class="auction_detail_bid_price">${bid.offer}</span>
						<span class="auction_detail_bid_user">{bid.user}</span>
						<span class="auction_detail_bid_time">{bid.offertime}</span>
					</li>
				{/each}
			</ul>
		</div>

		<button on:click={() => showModal = false}>close </button>

	</Modal>
{/if}





<style>
	.auction_box {
		width: 300px;
		border: 1px solid #aaa;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1);
		background: #ffffff;
		padding: 1em;
		margin: 0 0 1em 0;
	}

</style>
