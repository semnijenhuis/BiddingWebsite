<script>


	import {onMount} from "svelte";


	import Modal from './Modal.svelte';

	let showModal = false;
	import {goto} from "@sapper/app";
	import {get} from "svelte/store";
	import {store} from "../store/store";

	let find = 0;
	let searchTerm;
	let cars = [];
	let error;
	let carID;
	let choosenCar;
	let tokenJson = get(store).token;

	let offer;

	// const addBid = async  (e) => {
	//
	// 	console.log("hello")
	// 	e.preventDefault();
	//
	//
	// 	const response = await  fetch(`/cars/${carID}/bid`, {
	// 		method: "POST",
	// 		headers: {
	// 			'Content-Type' : 'application/json',
	// 			'Accept': 'application/json',
	// 			'authorization': 'Bearer '+ tokenJson
	// 		},
	//
	//
	// 		body: JSON.stringify({offer: offer})
	// 	});
	//
	//
	// 	if (response.status === 200) {
	// 		offer = ""
	// 		await refreshCars()
	// 		await pressedCar(choosenCar)
	//
	// 		showModal = true
	//
	//
	// 	}
	// 	else {
	// 		alert("Your not logged in")
	// 		error = await  response.json();
	// 		console.log(error)
	// 	}
	// }
	//
	// async function pressedCar(choosen) {
	// 	console.log("pressed car")
	// 	showModal = true
	// 	choosenCar = choosen
	// 	carID = choosen.id
	// }

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

	// onMount(async () => {
	//
	// 	await refreshCars()
	//
	// 	});


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

	const findItem = async  () => {
		console.log("you are finding")
		console.log(find)
		find++

	}



</script>

	<svelte:head>
		<title>Sapper project template</title>
	</svelte:head>

<h1>hello</h1>
<button on:click="{findItem()}" >
	find car
</button>

<div class ="row">

	{#if find > 0}

		<h1>hello</h1>

		{/if}


	{#each cars as car (car)}
<!--		<div>{car.model} </div>-->
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
	<Modal on:close="{() => showModal = false}">

		<div  class="row">
			<section class="auction_detail">

				<div id="auctionItem" class="auction_column">
					<h1 class="auction_title">{choosenCar.brand + choosenCar.model}</h1>
					<p class="auction_description">
						{choosenCar.description}
					</p>

					<form id="auctionBid" method="" action="/">
						<input class="auction_bid_amount" type="text" placeholder="amount" bind:value={offer}/><br />
						<button on:click={addBid}>Bid</button>
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
				</div>
			</section>
		</div>



	</Modal>
{/if}





<style>


</style>


