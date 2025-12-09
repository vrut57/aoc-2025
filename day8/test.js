const assert = require('node:assert/strict');
const test = require('node:test');
const { processInput, part1, part2 } = require('./playground');

test('Part1 - should handle example input', async () => {
    const input = [
        "162,817,812",
        "57,618,57",
        "906,360,560",
        "592,479,940",
        "352,342,300",
        "466,668,158",
        "542,29,236",
        "431,825,988",
        "739,650,466",
        "52,470,668",
        "216,146,977",
        "819,987,18",
        "117,168,530",
        "805,96,715",
        "346,949,466",
        "970,615,88",
        "941,993,340",
        "862,61,35",
        "984,92,344",
        "425,690,689"
    ];
    const result = part1(input, 10)
    assert.equal(result, 40);
})
test('Part1 - should handle full input', async () => {
    const input = await processInput("input.txt");
    const result = part1(input, 1000) // 79, 59, 29
    assert.equal(result, 135169);
})

test('Part2 - should handle example input', async () => {
    const input = [
        "162,817,812",
        "57,618,57",
        "906,360,560",
        "592,479,940",
        "352,342,300",
        "466,668,158",
        "542,29,236",
        "431,825,988",
        "739,650,466",
        "52,470,668",
        "216,146,977",
        "819,987,18",
        "117,168,530",
        "805,96,715",
        "346,949,466",
        "970,615,88",
        "941,993,340",
        "862,61,35",
        "984,92,344",
        "425,690,689"
    ];
    const result = part2(input, 10)
    assert.equal(result, 25272);
})

test('Part2 - should handle full input', async () => {
    const input = await processInput("input.txt");
    const result = part2(input) 
    assert.equal(result, 302133440);
})