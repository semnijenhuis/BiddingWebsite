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

<form>
	<label for="username"> username</label>
	<input type="text" name ="username" id="username" bind:value={username}/><br />

	<label for="email"> email</label>
	<input type="text" name ="email" id="email" bind:value={email}/><br />

	<label for="password"> password</label>
	<input type="password" name ="password" id="password" bind:value={password}/><br />

	<label for="passwordCheck"> password check</label>
	<input type="password" name ="passwordCheck" id="passwordCheck" bind:value={passwordCheck}/><br />
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
</style>