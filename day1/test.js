const assert = require('node:assert/strict');
const test = require('node:test');
const { processInput, part1, part2 } = require('./secret-entrance');

test('should overlap when going right', async () => {
    const result = await part1(['R50']);
    assert.equal(result, 1);
});

test('should overlap when going left', async () => {
    const result = await part1(['L50']);
    assert.equal(result, 1);
});

test('should pass part 1', async () => {
    const input = await processInput("input.txt");
    const result = await part1(input);
    assert.equal(result, 1084);
});

test('part 2 - R150 counts both hits at zero', async () => {
    const result = await part2(['R150']);
    assert.equal(result, 2);
});

test('part 2 - L18, L32', async () => {
    const result = await part2(['L18', 'L32']);
    assert.equal(result, 1);
});

test('part 2', async () => {
    const result = await part2(['R25', 'L35', 'R123', 'L98']);
    assert.equal(result, 2);
});

test('Part 2 - should pass sample test case given in problem statement', async () => {
    const result = await part2(['L68','L30','R48','L5','R60','L55','L1','L99','R14','L82']);
    assert.equal(result, 6);
});

test('Part 2 - should pass with real input', async () => {
    const input = await processInput('input.txt');
    const result = await part2(input);
    assert.equal(result, 6475);
});
