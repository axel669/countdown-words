<script>
    import Adornment from "svelte-doric/core/adornment"
    import Button from "svelte-doric/core/button"
    import TitleBar from "svelte-doric/core/title-bar"

    import Flex from "svelte-doric/core/layout/flex"

    import Selection from "./game/selection.svelte"
    import Answers from "./answers.svelte"

    import {genSelection, wordSource} from "@/game"
    import rand from "@/rand"
    import find from "@/find"

    let selection = []
    let userWord = null
    let valid = false
    let answers = null
    let vowelCount = 4

    const select = () => {
        userWord = null
        answers = null
        selection = genSelection(
            rand(4) + 3
        )
    }

    const check = (evt) => {
        const guess = evt.detail
        const userGuess = [...guess].sort().join("")
        userWord = guess.join("")
        valid = $wordSource[userGuess]?.includes(userWord) ?? false
        answers =  find(
            [...selection].sort().join(""),
            $wordSource
        )
    }
</script>

<style>
    adornment-wrapper {
        display: grid;
        width: 56px;
    }

    game-area {
        display: block;
        margin: auto;
        width: min(480px, 100%);
    }
</style>

<game-area>
    <TitleBar sticky>
        Countdown Words

        <svelte:fragment slot="adornments">
            <Adornment position="action">
                <adornment-wrapper>
                    <Button on:tap={select}>
                        New
                    </Button>
                </adornment-wrapper>
            </Adornment>
        </svelte:fragment>
    </TitleBar>

    <Flex direction="column">
        {#if answers === null}
            {#if selection.length > 0}
                <Selection {selection} on:guess={check} />
            {/if}
        {:else}
            <Answers {userWord} {valid} {answers} />
        {/if}
    </Flex>
</game-area>
