function toArray(text) {
    const pair = text
        .split(" ")
        .filter(char => Boolean(char))
        .map(coordinate => parseInt(coordinate))

    if (
        pair.length == 2 &&
        typeof pair[0] == "number" &&
        typeof pair[1] === "number"
    ) {
        return pair
    }
    throw new Error(
        `Given input not compatible with hoover specification. Cooridnates should be a pair of integers, got: ${text}`
    )
}

/**
 * Takes a string of text and parses it.
 * @returns object with
 * @property room - dimensions (first line)
 * @property location - of the hoover (second line)
 * @property dirty - array of patches
 * @property instructions (the final line)
 */
module.exports = function(text) {
    if (typeof text !== "string")
        throw new Error(
            `Should be given a text according to specs. Got: ${text}`
        )
    const lines = text.split("\n").filter(x => Boolean(x))

    const room = toArray(lines[0])

    const location = toArray(lines[1])

    const dirty = lines.slice(2, lines.length - 1).map(char => toArray(char))

    const instructions = lines[lines.length - 1].replace(/\s+/g, "") // Remove whitespace

    return {
        room,
        dirty,
        location,
        instructions,
    }
}
