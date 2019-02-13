const parse = require('./parse')

test("parsing of correct incomming data", () => {
	const actual = parse(`5 5
1 2
1 0
2 2
2 3
NNESEESWNWW`)
	expect(actual).not.toBeFalsy
	expect(actual).toHaveProperty('room')
	expect(actual.room).toEqual([5, 5])
	expect(actual).toHaveProperty('location')
	expect(actual.location).toEqual([1, 2])
	expect(actual).toHaveProperty('dirty')
	expect(actual.dirty).toEqual([
		[1, 0],
		[2, 2],
		[2, 3]
	])
	expect(actual).toHaveProperty('instructions')
	expect(actual.instructions).toEqual('NNESEESWNWW')
})

test("does not break with leading or trailing spaces", () => {
	const actual = parse(`
	5  5



	1 2
	1 0


	2 2
	2 3
	NEWS





`)
	expect(actual).not.toBeFalsy
	expect(actual).toHaveProperty('room')
	expect(actual.room).toEqual([5, 5])
	expect(actual).toHaveProperty('location')
	expect(actual.location).toEqual([1, 2])
	expect(actual).toHaveProperty('dirty')
	expect(actual.dirty).toEqual([
		[1, 0],
		[2, 2],
		[2, 3]
	])
});

test("returns empty array if there are no dirty patches", () => {
	const actual = parse(`
	0x5 9007199254740991
	2 0xC0FEE
	SEWN`)
	expect(actual).not.toBeFalsy
	expect(actual).toHaveProperty('room')
	expect(actual.room).toEqual([5, Number.MAX_SAFE_INTEGER])
	expect(actual).toHaveProperty('location')
	expect(actual.location).toEqual([2, 790510])
	expect(actual).toHaveProperty('dirty')
	expect(actual.dirty).toEqual([])
});
