<script>
    import {goto} from '@sapper/app';
    import {writable,get } from 'svelte/store'
    import {store} from "../store/store";

    const count = writable(0)
    export let loginUser = []


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
        <input type="text" name ="username" id="username" placeholder="username" bind:value={username}/><br />
        <input type="password" name ="password" id="password" placeholder="password" bind:value={password}/><br />
        {#if username, password}
        <button on:click={doLogin}>login</button>
            {/if}
    </form>
</div>


{#if error}
    <span class="error">Invalid username/password, try again. Error:{error.msg}</span>
    {/if}

<style>

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        --primary-color: #D96AA7;
        --secondary-color: #422C73;
        --complimentary-color: #88BFB5;
        --contrast-color: #F2E527;
        --light-color: #D2A9D9;
    }

    .container {
        background: #191919;
        min-height: 100vh;
        font-family: Montserrat, sans-serif;
    }

    nav a {
        font-size: 40px;
        color: #fff;
        text-decoration: none;
        padding: 20px;
        text-align: center;
    }

    nav {
        position: fixed;
        left: 0;
        z-index: 50;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        height: 100vh;
        background: var(--secondary-color);
    }

    section {
        position: absolute;
        top: 0;
        height: 100vh;
        width: 0;
        opacity: 0;
        transition: all ease-in .5s;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    section h1 {
        color: #fff;
        font-size: 50px;
        text-transform: uppercase;
        opacity: 0;
    }

    /* Styles applied on trigger */
    section:target {
        opacity: 1;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
    }

    section:target h1 {
        opacity: 0;
        animation: 2s fadeIn forwards .5s;
    }

    login {
        background:var(--primary-color);
    }
    #second {
        background: var(--complimentary-color);
    }

    #third {
        background: var(--contrast-color);
    }

    #fourth {
        background: var(--light-color);
    }

    @keyframes fadeIn {
        100% { opacity:1 }
    }


</style>