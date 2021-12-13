<script>
    import {fade} from "svelte/transition"

    import Card from "svelte-doric/core/card"

    import Flex from "svelte-doric/core/layout/flex"
    import Grid from "svelte-doric/core/layout/grid"

    export let answers
    export let valid
    export let userWord

    const baseURL = "https://www.merriam-webster.com/dictionary/"

    $: color = valid ? "secondary" : "danger"
</script>

<style>
    gap-area {
        display: block;
        height: 8px;
    }

    possible-word {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4px;
    }
    possible-word.user > a {
        color: var(--secondary);
    }

    a, a:hover, a:visited {
        color: white;
    }
</style>

<div in:fade={{duration: 200}}>
    <Card {color}>
        <svelte:fragment slot="title">
            Your Word
        </svelte:fragment>

        <Flex>
            {userWord} is {valid ? "" : "not"} a word
        </Flex>
    </Card>

    <gap-area />

    <Card>
        <svelte:fragment slot="title">
            Possible Words
        </svelte:fragment>

        <Grid cols={3}>
            {#each answers as answer}
                <possible-word class:user={answer === userWord}>
                    <a href="{baseURL}{answer}" target="_blank">
                        {answer}
                    </a>
                </possible-word>
            {/each}
        </Grid>
    </Card>
</div>
