<script>


	import {onMount} from "svelte";


	import Modal from './Modal.svelte';

	let showModal = false;
	import {goto} from "@sapper/app";
	import {get} from "svelte/store";
	import {store} from "../store/store";


	let cars = [];
	let error;
	let carID;
	let choosenCar;
	let tokenJson = get(store).token;

	let offer;

	const addBid = async  (e) => {

		console.log("hello")
		e.preventDefault();


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
			const token = await response.json();
			window.location.reload();
			showModal = true
			goto('/')

		}
		else {
			alert("helloooo")
			error = await  response.json();
			console.log(error)
		}
	}

	async function pressedCar(choosen) {
		showModal = true
		choosenCar = choosen
		carID = choosen.id
	}

	onMount(async () => {


		// const getCars = async  (e) => {
			const response = await fetch('/cars', {
				method: "GET",
				headers: {
					'Content-Type' : 'application/json',
					'Accept': 'application/json',
				},
			});
			cars = await response.json();


			// return response.json();
		});


	const getCar = async  (e) => {

		e.preventDefault();
		carID = e;

		const response = await  fetch(`/cars/${carID}`, {
			method: "GET",
			headers: {
				'Content-Type' : 'application/json',
				'Accept': 'application/json',
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



</script>

	<svelte:head>
		<link rel="stylesheet" href="public/styles.css">
		<title>Sapper project template</title>
	</svelte:head>


<div class ="row">

	{#each cars as car (car)}
<!--		<div>{car.model} </div>-->
	<section class="auction_box">
		<a class="auction_title">{car.brand}</a>
		<p class="auction_description">
			beautiful {car.brand} {car.model} {car.bodyType}
			who has been build in {car.buildYear} with starting price of ${car.price}
			we have {car.bids.length} bids and the auction will end on {car.auctionEndDate} at {car.auctionEndTime} so give it a shot!
		</p>
		<div class="auction_bid">
			<span class="auction_bid_price">{car.price}</span>
			<span class="auction_bid_time">{car.auctionEndTime}</span>
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
									<span class="auction_detail_bid_price">{bid.offer}</span>
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
	.auction_box {
		background: white;
		margin: 1.5%;
		flex: 0 0 30%;
		box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
	}

	.auction_title {
		font-size: 32px;
		margin: 1rem;
		display: block;
		color: black;
		text-decoration: none;
	}

	p.auction_description {
		padding: 0 1rem;
	}

	.auction_bid {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.auction_bid_price,
	.auction_bid_time {
		flex-direction: column;
		text-align: center;
		width: 50%;
		padding: 1rem 0;
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.row > .auction_box {
		background: white;
		margin: 1.5%;
		flex: 0 0 30%;
		box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
	}

	h1, figure, p {
		text-align: center;
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		text-transform: uppercase;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	figure {
		margin: 0 0 1em 0;
	}

	img {
		width: 100%;
		max-width: 400px;
		margin: 0 0 1em 0;
	}

	p {
		margin: 1em auto;
	}

	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>


