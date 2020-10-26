<script>

	import successkid from 'images/successkid.jpg';
	import {onMount} from "svelte";

	let cars = [];
	onMount(async () => {
		console.log("start")

		// const getCars = async  (e) => {
			const response = await fetch('/cars', {
				method: "GET",
				headers: {
					'Content-Type' : 'application/json',
					'Accept': 'application/json',
				},

			});
			cars = await response.json();
			console.log(cars)
		console.log("end");
			// return response.json();
		});
	// })


	// console.log("beloow")
	// console.log("above")
	// console.log(getCars())

</script>

<!--{#await fetchCars()}-->
<!--	<p>..waiting</p>-->
<!--	{:then data}-->
<!--	<th>{data.message}</th>-->
<!--	{:catch error}-->
<!--	<p> An error occured</p>-->
<!--	{/await}-->


	<svelte:head>
		<title>Sapper project template</title>
	</svelte:head>

<ul>
	{#each cars as car}
		<Box>
			<h1>{car.model}</h1>
		</Box>
	{/each}
</ul>


	<h1>Great success!</h1>

	<figure>
		<img alt="Success Kid" src="{successkid}">
		<figcaption>Have fun with Sapper!</figcaption>
	</figure>

	<p><strong>Try editing this file (src/routes/index.svelte) to test live reloading.</strong></p>





<style>
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


