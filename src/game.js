import {readable, writable} from "svelte/store"

import rand from "@/rand"

const ready = readable(
    false,
    async (set) => {
        const response = await fetch("./word-tree.json")
        wordSource.set(
            await response.json()
        )
        set(true)
    }
)
const wordSource = writable(null)

const range = (n) => Array.from({ length: n }, () => 0)

// const vowels = ["A", "E", "I", "O", "U"]
const vowels = ["a", "e", "i", "o", "u"]
const consonants =
    Array.from(
        { length: 26 },
        (_, i) => String.fromCharCode(97 + i)
    )
    .filter(
        letter => vowels.includes(letter) === false
    )
const randV = () => vowels[rand(5)]
const randC = () => consonants[rand(21)]
const genSelection = (vowelCount) => {
    const cCount = 9 - vowelCount
    const letters = [
        ...Array.from(
            { length: vowelCount },
            () => randV()
        ),
        ...Array.from(
            { length: cCount },
            () => randC()
        ),
    ]

    for (const _ of range(10)) {
        const target = rand(8) + 1
        ;[letters[0], letters[target]] = [letters[target], letters[0]]
    }

    return letters
}

export {
    ready,
    wordSource,
    genSelection,
}
