<script>
	import Nav from '../components/Nav.svelte';

	export let segment;
</script>





<style>
	main {
		position: relative;
		background-color: #c3c3c3;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;

	}

</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>