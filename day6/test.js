const assert = require('node:assert/strict');
const test = require('node:test');
const { processInput, part1, part2 } = require('./trash-compactor');

test('Part1 - should handle base cases', async () => {
    const input = [
        "123 328  51 64",
        "45 64  387 23", 
        "6 98  215 314",
        "*   +   *   +"
    ];
    const result = part1(input)
    assert.equal(result, 4277556);
})

test('Part1 - should handle full input', async () => {
    const input = await processInput("input.txt");
    const result = part1(input)
    assert.equal(result, 5316572080628);
})