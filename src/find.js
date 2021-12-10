//  https://www.wordgamedictionary.com/word-lists/

const pick = (elems, s = "") => {
    if (elems.length === 0) {
        return [s]
    }

    return [
        s,
        ...elems
            .map(
                (l, i) => pick(
                    elems.slice(i + 1),
                    `${s}${l}`,
                )
            )
            .flat(1)
    ]
}
const wordSort = (a, b) => {
    if (a.length < b.length) {
        return 1
    }
    if (a.length > b.length) {
        return -1
    }
    if (a < b) {
        return -1
    }
    if (a > b) {
        return 1
    }
    return 0
}
const find = (selection, tree) => {
    const letterArray = selection.toLowerCase().split("").sort()
    const options = pick(letterArray)
    const unique = new Set(
        options
            .map(
                check => tree[check] ?? []
            )
            .flat()
    )
    const foundWords = [...unique].sort(wordSort)

    return foundWords
}

export default find
