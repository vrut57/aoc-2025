const assert = require('node:assert/strict');
const test = require('node:test');
const { processInput, part1, part2 } = require('./printing-dept');

test('Part1 - should handle base cases', async () => {
    const input = ['..@@.@@@@.',
                '@@@.@.@.@@',
                '@@@@@.@.@@',
                '@.@@@@..@.',
                '@@.@@@@.@@',
                '.@@@@@@@.@',
                '.@.@.@.@@@',
                '@.@@@.@@@@',
                '.@@@@@@@@.',
                '@.@.@@@.@.']
    const result = await part1(input)
    assert.equal(result, 13);
})
test('Part1 - get correct solution ', async () => {
    const input = await processInput("input.txt");
    const result = await part1(input)
    assert.equal(result, 1384);
})