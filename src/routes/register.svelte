<script>
    import {goto} from '@sapper/app';
    import {emailValidator, passwordValidator} from '../server/data/util'

    let username;
    let email = ""
    let password = ""
    let passwordCheck = ""
    let error;
    let valid = false

    // lets you register
    const doRegister = async (e) => {
        e.preventDefault();
        if (emailValidator(email) === true && passwordValidator(password) === true && password === passwordCheck) {

            const response = await fetch('http://localhost:3000/users', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({username: username, email: email, password: password})
            });

            if (response.status === 200) {
                const token = await response.json();
                console.log(token)
                goto('/login')

            } else {
                alert(err)
                error = await response.json();
                console.log(error)
            }
        } else {
            valid = true
        }
    }

</script>

<form id="register_form" class="register_form" method="" action="">
    <h1 class="auction_title">Register</h1>
    <input type="text" name="username" id="usernameField" placeholder="username" bind:value={username}/><br/>
    <input type="text" name="email" id="emailField" placeholder="email" bind:value={email}/><br/>

    {#if emailValidator(email)}
        <td>Email contains all requirements</td>
    {:else}
        <td>Needs @ and end with .nl or .com</td>
    {/if}

    <input type="password" name="password" id="passwordField" placeholder="password" bind:value={password}/><br/>
    {#if passwordValidator(password)}
        <td>Password contains all requirements</td>
    {:else}
        <td>6 Characters & 1 capital & 1 digit</td>
    {/if}
    <input type="password" name="passwordCheck" id="passwordCheckField" placeholder="password repeat"
           bind:value={passwordCheck}/><br/>
    {#if password !== passwordCheck}
        <td>Passwords does not match</td>
    {/if}

    {#if username, emailValidator(email), passwordValidator(password), password === passwordCheck, passwordCheck}
        <button id="registerButton" on:click={doRegister}>login</button>
    {/if}

</form>

<style>
    .register_form{
        background-color: white;
        box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
        padding: 1.5rem;
        margin-top: 4rem;
        width: 50%;
    }

    .register_form input[type=text],
    .register_form input[type=password]{
        width: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin: 1rem 0;
    }
</style>