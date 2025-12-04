const assert = require('node:assert/strict');
const test = require('node:test');
const { processInput, part1, part2 } = require('./lobby');

test('Part1 - should handle base cases', async () => {
    const result = await part1(['987654321111111', '811111111111119', '234234234234278', '234234234234278'])
    assert.equal(result, 343);
})

test('Part2 - should handle base cases', async () => {
    const result = await part2(['987654321111111','811111111111119','234234234234278','818181911112111'])
    assert.equal(result, 3121910778619)
})

test('Part2 - should handle large numbers at the end', async () => {
    const result = await part2(['811111111111119'])
    assert.equal(result, 811111111119)
})

test('Part2 - should handle repeating sequence', async () => {
    const result = await part2(['234234234234278'])
    assert.equal(result, 434234234278)
})
test('Part2 - basic entry', async () => {
    const result = await part2(['987654321111111'])
    assert.equal(result, 987654321111)
})
test('Part2 - should handle repeating sequence', async () => {
    const result = await part2(['818181911112111'])
    assert.equal(result, 888911112111)
})
test('Part2 - should handle long input', async () => {
    const result = await part2(['6839153353242324143271184245154323237323424572457644344234734233332343344532643622213823683942455442'])
    assert.equal(result, 988942455442)
})
test('Part 2 - should pass with real input', async () => {
    const input = await processInput('input.txt');
    const result = await part2(input);
    assert.equal(result, 172787336861064);
});