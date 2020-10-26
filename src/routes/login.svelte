<script>
    import {goto} from '@sapper/app';

    let username;
    let password;
    let error;

    const doLogin = async  (e) => {
        console.log("hello")
        e.preventDefault();
        console.log("should log in");


        const response = await  fetch('http://localhost:3000/auth', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({username: username, password:password})
        });

        if (response.status === 200) {
            const token = await response.json();
            console.log(token)
            goto('/')

        } else {
            error = await  response.json();
            console.log(error)
        }
    }
</script>

<form>
    <label for="username"> username</label>
    <input type="text" name ="username" id="username" bind:value={username}/><br />
    <label for="password"> password</label>
    <input type="password" name ="password" id="password" bind:value={password}/><br />
    <button on:click={doLogin}>login</button>
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