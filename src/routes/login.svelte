<script>
    import {goto} from '@sapper/app';
    import {writable,get } from 'svelte/store'
    import {store} from "../store/store";

    const count = writable(0)

    let username;
    let password;
    let error;

    const doLogin = async  (e) => {
        console.log("hello")
        e.preventDefault();

        const response = await  fetch('/auth', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({username: username, password:password})
        });

        if (response.status === 200) {
            const token = await response.json();

            store.set(token)
            let tokenJson = get(store).token;
            console.log("below")
            console.log(tokenJson)
            goto('/')

        } else {
            error = await  response.json();
            console.log(error)
        }
    }
</script>


<div class="row">
    <form class="login_form" method="" action="">
        <h1 class="auction_title">Login</h1>
        <input type="text" name ="username" id="username" placeholder="username" bind:value={username}/><br />
        <input type="password" name ="password" id="password" placeholder="password" bind:value={password}/><br />
        {#if username, password}
        <button on:click={doLogin}>login</button>
            {/if}
    </form>
</div>


{#if error}
    <span class="error">{error.msg}</span>
    {/if}

<style>




</style>