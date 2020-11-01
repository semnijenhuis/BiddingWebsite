<script>
    import {get} from "svelte/store";
    import {store} from "../store/store";
    import {onMount} from "svelte";

    let tokenJson = get(store).token;

    onMount(async () => {
        store.update(n => n - 1);
    });

</script>

<h1>Tot ziens</h1>

<style>

</style>