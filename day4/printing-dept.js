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


async function part1(input) {
    const arrInput = input.map(ele => ele.split(""));
    let count = 0;
    arrInput.forEach((row, y) => {
        row.forEach((ele, x) => {
            let colPointer = -1;
            let rowPointer = -1;
            let freeCellCount = 0;
            if(ele === ".") {
                return;
            }
            for(let i = colPointer; i <= 1; i++) {
                for(let ii = rowPointer; ii <= 1; ii++) {
                    if(i === 0 && ii === 0) {
                        continue;
                    }
                    if(y+i < 0 || y+i >= input.length|| x+ii < 0 || x + ii >= input[0].length || arrInput[y+i][x+ii] === ".") {
                        freeCellCount++;
                    }
                }
            }
            if(freeCellCount > 4) {
                count++;
            }
        })
    })
    return count;
}

async function part2(input) {
    const arrInput = input.map(ele => ele.split(""));
    let count = 0;
    let isAccessible = true;
    while(isAccessible) {
        let turnCount = 0
        let indexToFlip = [];
        arrInput.forEach((row, y) => {
            row.forEach((ele, x) => {
                let colPointer = -1;
                let rowPointer = -1;
                let freeCellCount = 0;
                if(ele === ".") {
                    return;
                }
                for(let i = colPointer; i <= 1; i++) {
                    for(let ii = rowPointer; ii <= 1; ii++) {
                        if(i === 0 && ii === 0) {
                            continue;
                        }
                        if(y+i < 0 || y+i >= input.length|| x+ii < 0 || x + ii >= input[0].length || arrInput[y+i][x+ii] === ".") {
                            freeCellCount++;
                        }
                    }
                }
                if(freeCellCount > 4) {
                    turnCount++;
                    indexToFlip.push([y, x]);
                }
            })
        })
        indexToFlip.forEach(([y,x]) => {
            arrInput[y][x] = ".";
        })
        count += turnCount;
        if(turnCount === 0) {
            isAccessible = false;
        }
    }
    return count;
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
