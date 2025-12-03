const assert = require('node:assert/strict');
const test = require('node:test');
const { part2 } = require('./gift-shop');

test('Part 2 - scratch', async () => {
    const result = await part2(["222220-222224"]);
    assert.equal(result, 222222);
});
