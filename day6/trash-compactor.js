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

function part1(input) {
    let sum = [];
    console.log(input);
    let signs = input[input.length - 1].replace(/ /g,"").split("");
    console.log({signs})

    input.slice(0, input.length -1).forEach((ele) => {
        const arr = ele.replace(/\s+/g," ").split(" ").map(Number);
        if(sum.length === 0) {
            sum = [...arr]
        } else {
            sum = arr.map((x, i) => {
                if(signs[i] === "*") {
                    return x * sum[i];
                }
                if(signs[i] === "+") {
                    return x + sum[i];
                }
            })
        }
    })
    return sum.reduce((acc,x) => acc + x)
}

function part2(input) {
    return "";
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