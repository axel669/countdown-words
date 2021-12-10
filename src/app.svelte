<svelte:head>
    <link
        href="https://fonts.googleapis.com/css?family=Inconsolata:300,400,500,700"
        rel="stylesheet"
        type="text/css"
    />
</svelte:head>

<script>
    import AppStyle from "svelte-doric/core/app-style"
    import baseline from "svelte-doric/core/baseline"
    import theme from "svelte-doric/core/theme/tron"

    import Spinner from "svelte-doric/core/circle-spinner"

    import Game from "@/comp/game.svelte"

    import {ready} from "@/game"
</script>

<style>
    load-area {
        display: block;
        text-align: center;
        margin: auto;
        width: min(480px, 100%);
    }
    load-text {
        display: block;
        font-size: var(--text-size-title);
    }

    :global(body) {
        --font: Inconsolata !important;
    }
</style>

<AppStyle {baseline} {theme} />

{#if $ready === false}
    <load-area>
        <Spinner />
        <load-text>
            Initializing Game
        </load-text>
    </load-area>
{:else}
    <Game />
{/if}
