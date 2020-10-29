<script>
	import {goto} from '@sapper/app';
	import {emailValidator, passwordValidator} from '../server/data/util'

	let username;
	let email = null
	let password;
	let passwordCheck;
	let error;
	let valid = false




	const doRegister = async  (e) => {
		e.preventDefault();
		if(emailValidator(email) === true && passwordValidator(password) === true && password === passwordCheck) {

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
				alert(err)
				error = await  response.json();
				console.log(error)
			}


		}
		else {
			valid = true
		}

	}






















</script>


<form id="register_form" class="register_form" method="" action="">
	<h1 class="auction_title">Register</h1>
	<input type="text"  name ="username" id="usernameField" placeholder="username" bind:value={username}/><br />

	<input type="text" name ="email" id="emailField" placeholder="email" bind:value={email}/><br />
	<td>Needs @ and end with .nl or .com </td>
	<input type="password" name ="password" id="passwordField" placeholder="password" bind:value={password}/><br />
	<td>6 Characters & 1 capital & 1 digit</td>
	<input type="password" name ="passwordCheck" id="passwordCheckField" placeholder="password repeat" bind:value={passwordCheck}/><br />
	{#if username,email, password,passwordCheck}
		<button id="registerButton" on:click={doRegister}>login</button>
		{/if}

</form>

{#if valid}
	<span class="error">Invalid information</span>
{/if}

<style>



</style>