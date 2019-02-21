const { Hoover } = require("robotic-hoover")
const { read, write } = require("./src/io")
const parse = require("./src/parse")

;(async () => {
    const data = await read()

    const { room, dirty, location, instructions } = parse(data)

    const hoover = new Hoover({
        room,
        dirty,
        location,
    })

    for (instruction of instructions) {
        hoover.move(instruction)
    }

    const [x, y] = hoover.getLocation()
    write(`${x} ${y}
${hoover.cleaned()}`)
})()
