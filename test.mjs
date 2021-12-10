import fs from "fs"
import pick from "./pick.mjs"

const selection = "abcdefghij".split("")
const words = JSON.parse(
    fs.readFileSync("static/word-tree.min.json")
)

console.time("find")
const checks = pick(selection)
const found =
    checks
        .map(
            check => words[check] ?? []
        )
        .flat()

const wordSort = (a, b) => {
    if (a.length < b.length) {
        return -1
    }
    if (a.length > b.length) {
        return 1
    }
    if (a < b) {
        return -1
    }
    if (a > b) {
        return 1
    }
    return 0
}
console.timeEnd("find")

// console.log(
//     found
//         .sort(wordSort)
//         .join("\n")
// )
