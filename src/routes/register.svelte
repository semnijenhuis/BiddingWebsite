<script>
	import {goto} from '@sapper/app';

	let username;
	let email;
	let password;
	let passwordCheck;
	let error;

	const doRegister = async  (e) => {
		console.log("hello")
		e.preventDefault();


		const response = await  fetch('http://localhost:3000/users', {
			method: "POST",
			headers: {
				'Content-Type' : 'application/json',
				'Accept': 'application/json',
			},
			body: JSON.stringify({username: username,email: email, password:password})
		});

		if (response.status === 200) {
			const token = await response.json();
			console.log(token)
			goto('/login')

		}
		else {
			alert("helloooo")
			error = await  response.json();
			console.log(error)
		}
	}
</script>


<form class="register_form" method="" action="">
	<h1 class="auction_title">Register</h1>
	<input type="text" name ="username" id="username" placeholder="username" bind:value={username}/><br />
	<input type="text" name ="email" id="email" placeholder="email" bind:value={email}/><br />
	<td>Needs @ and end with .nl or .com </td>
	<input type="password" name ="password" id="password" placeholder="password" bind:value={password}/><br />
	<td>6 Characters & 1 capital & 1 digit</td>
	<input type="password" name ="passwordCheck" id="passwordCheck" placeholder="password repeat" bind:value={passwordCheck}/><br />
	<button on:click={doRegister}>login</button>
</form>

{#if error}
	<span class="error">{error.msg}</span>
{/if}

<style>

	.error{
		color: red;
		font-weight: bold;
	}

	.register_form{
		background-color: white;
		box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
		padding: 1.5rem;
		margin-top: 4rem;
		width: 50%;
	}

	.register_form input[type=text],
	.register_form input[type=password],
	.login_form input[type=text],
	.login_form input[type=password] {
		width: 100%;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		margin: 1rem 0;
	}

	.auction_title {
		font-size: 32px;
		margin: 1rem;
		display: block;
		color: black;
		text-decoration: none;
	}

	input[type=text],
	input[type=password] {
		color: gray;
		padding: 0.5rem;
		font-size: 17px;
		border: 1px solid grey;
	}
	input[type=submit] {
		background-color: #005066;
		color: white;
		padding: 0.5rem;
		font-size: 17px;
		border: 1px solid #005066;
	}

	table td, table th {
		border: 1px solid #ddd;
		padding: 0.5rem;
		text-align: center;
	}

</style>