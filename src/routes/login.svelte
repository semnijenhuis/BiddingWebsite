<script>
    import {goto} from '@sapper/app';
    import {get} from 'svelte/store'
    import {store} from "../store/store";

    let username;
    let password;
    let error;

    const doLogin = async (e) => {
        console.log("hello")
        e.preventDefault();

        const response = await fetch('/auth', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({username: username, password: password})
        });

        if (response.status === 200) {
            const token = await response.json();
            store.set(token)
            let tokenJson = get(store).token;
            console.log(tokenJson)

            goto('/')

        } else {
            error = await response.json();
            console.log(error)
        }
    }

</script>


<div class="row">
    <form class="login_form" method="" action="">
        <h1 class="auction_title">Login</h1>
        <input type="text" name="username" id="username" placeholder="username" bind:value={username}/><br/>
        <input type="password" name="password" id="password" placeholder="password" bind:value={password}/><br/>
        {#if username, password}
            <button on:click={doLogin}>login</button>
        {/if}
    </form>
</div>

{#if error}
    <span class="error">Invalid username/password, try again. Error:{error.msg}</span>
{/if}

<style>
    .login_form {
        background-color: white;
        box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
        padding: 1.5rem;
        margin-top: 4rem;
        width: 50%;
    }

    .login_form input[type=text],
    .login_form input[type=password] {
        width: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin: 1rem 0;
    }


</style>