const fs = require('fs');
const readline = require('readline');

async function processInput(filepath) {
    const input = [];
    const fileStream = fs.createReadStream(filepath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl) {
        input.push(line);
    }
    return input;
}

function trueMod(a, b) {
    return (((a % b) + b) % b);
}

async function part1(input) {
    let index = 50;
    let zeroCount = 0;
    for (let i = 0; i < input.length; i++) {
        const direction = input[i].slice(0, 1);
        const clicks = parseInt(input[i].slice(1));
        if(direction === 'R') {
            index = trueMod((index + clicks),100);
        } else if (direction === 'L') {
            index = trueMod((index - clicks), 100)
        } else {
            throw Error("Direction not supported");
        }
        if(index === 0) {
            zeroCount++;
        }
    }
    return zeroCount;
}

async function part2(input) {
    let index = 50;
    let password = 0;
    for(let i = 0; i < input.length; i++) {
        const sign = input[i].slice(0, 1) === "R" ? 1 : -1;
        const clicks = parseInt(input[i].slice(1));
        let rotations = Math.floor(clicks / 100);
        const remainder = clicks % 100;

        let newIndex = trueMod((index + (remainder * sign)), 100);

        const distToZero = sign > 0 ? 100 - index : index;
        if(index !== 0 && remainder >= distToZero) {
            password++;
        }
        
        password += rotations;
        index = newIndex;
    }
    return password;
}

async function main() {
    const input = await processInput("input.txt");
    const part1Answer = await part1(input);
    console.log("Part 1 answer: %s", part1Answer);

    const part2Answer = await part2(input);
    console.log({part1Answer, part2Answer})
    console.log("Part 2 answer: %s", part2Answer);
}
if (require.main === module) {
    main();
}

module.exports = { processInput, part1, part2 };
