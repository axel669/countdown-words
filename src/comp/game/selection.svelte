<script>
    import {createEventDispatcher} from "svelte"
    import {crossfade, fly} from "svelte/transition"

    import Button from "svelte-doric/core/button"
    import Icon from "svelte-doric/core/icon"

    const dispatch = createEventDispatcher()
    const [send, receive] = crossfade({
        duration: 200,
        fallback: fly,
    })
    const wat = () => ({
        duation: 200,
        css: (t) => {
            return "display: none; position: absolute;"
        }
    })

    export let selection
    let guess = []
    $: userWord = guess.map(index => selection[index])
    $: (selection, guess = [])

    const use = (index) =>
        () => {
            guess = [...guess, index]
        }
    const unuse = (index) =>
        () => {
            guess = guess.filter(
                (pos) => pos !== index
            )
        }

    const check = () => {
        dispatch("guess", userWord)
    }
</script>

<style>
    selection-area {
        display: grid;
        grid-template-rows: 32px;
        grid-template-columns: repeat(9, 1fr);
        gap: 2px;
        padding: 2px;
        text-transform: uppercase;
    }

    selection-item {
        display: grid;
    }

    gap-area {
        display: block;
        height: 16px;
    }
</style>

<selection-area>
    {#each selection as letter, index (index)}
        <selection-item>
            {#if guess.includes(index) === false}
                <selection-item
                in:receive|local={{key: index}}
                out:send|local={{key: index}}>
                    <Button on:tap={use(index)} variant="outline" color="primary">
                        {letter}
                    </Button>
                </selection-item>
            {/if}
        </selection-item>
    {/each}
</selection-area>

<gap-area />

<selection-area>
    {#each guess as index (index)}
        <selection-item
        in:receive|local={{key: index}}
        out:send|local={{key: index}}>
            <Button on:tap={unuse(index)} color="secondary" variant="outline">
                {selection[index]}
            </Button>
        </selection-item>
    {/each}
</selection-area>

{#if guess.length > 0}
    <Button on:tap={check} variant="outline">
        Check Word
    </Button>
{/if}
