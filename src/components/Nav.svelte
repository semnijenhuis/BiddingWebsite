
<script>

	import {store} from "../store/store";
	import {get} from "svelte/store";
	let tokenJson = get(store).token;
	console.log(tokenJson)

	export let user = false;
	export let admin = false
	export let empty = true

	export let segment;




</script>


	<nav>
		<ul class="menu-bar">
			<li class="li"><a aria-current="{segment === undefined ? 'page' : undefined}" href=".">home</a></li>
			<li class="li"><a aria-current="{segment === 'login' ? 'page' : undefined}" href="login">login</a></li>
			<li class="li"><a aria-current="{segment === 'register' ? 'page' : undefined}" href="register">register</a></li>
			<li class="li"><a aria-current="{segment === 'mybids' ? 'page' : undefined}" href="mybids">mybids</a></li>
			<li class="li"><a aria-current="{segment === 'administration' ? 'page' : undefined}" href="administration">administration</a></li>
			<li class="li"><a aria-current="{segment === 'logout' ? 'page' : undefined}" href="logout">logout</a></li>
		</ul>
	</nav>





<style>

	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
		display: inline-block;
		text-align: center;
		list-style-type: none;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: inline-block;
		list-style-type: none;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}






</style>