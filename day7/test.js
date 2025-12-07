const assert = require('node:assert/strict');
const test = require('node:test');
const { processInput, part1, part2 } = require('./laboratories');

test('Part1 - should handle base cases', async () => {
    const input = [
        ".......S.......",
        "...............",
        ".......^.......",
        "...............",
        "......^.^......",
        "...............",
        ".....^.^.^.....",
        "...............",
        "....^.^...^....",
        "...............",
        "...^.^...^.^...",
        "...............",
        "..^...^.....^..",
        "...............",
        ".^.^.^.^.^...^.",
        "..............."
    ];
    const result = part1(input)
    assert.equal(result, 21);
})

test('Part1 - should handle full input', async () => {
    const input = await processInput("input.txt");
    console.log({input})
    const result = part1(input)
    assert.equal(result, 1698);
})