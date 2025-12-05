const assert = require('node:assert/strict');
const test = require('node:test');
const { processInput, part1, part2 } = require('./cafeteria');

test('Part1 - should handle base cases', async () => {
    const input = [
        "3-5",
        "10-14",
        "16-20",
        "12-18",
        "",
        "1",
        "5",
        "8",
        "11",
        "17",
        "32"
        ]
    const result = await part1(input)
    assert.equal(result, 3);
})

test('Part1 - should handle full output', async () => {
    const input = await processInput("input.txt");
    const result = await part1(input)
    assert.equal(result, 635);
})

test('Part2 - should handle base case', async () => {
    const input = [
        "3-5",
        "10-14",
        "16-20",
        "12-18",
        "",
        "1",
        "5",
        "8",
        "11",
        "17",
        "32"
    ];
    const result = await part2(input)
    assert.equal(result, 14);
})

test('Part2 - should handle full output', async () => {
    const input = await processInput("input.txt");
    const result = await part2(input)
    assert.equal(result, 369761800782619);
})