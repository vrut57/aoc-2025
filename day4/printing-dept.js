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
    console.log({input})
    const arrInput = input.map(ele => ele.split(""));
    let count = 0;
    const yBound = input.length;
    const xBound = input[0].length;
    arrInput.forEach((row, y) => {
        // console.log({row})
        row.forEach((ele, x) => {
            // check all elements around accounting for edges
            let colPointer = -1;
            let rowPointer = -1;
            let freeCellCount = 0;
            //Check if roll of paper exists at that location
            // console.log("Ele at loc: %s, coords: (%s,%s)", ele, y, x);
            if(ele === ".") {
                // skip check bc there isn't a roll of paper there
                // console.log("Skipping - no role of paper exists at loc")
                return;
            }
            for(let i = colPointer; i <= 1; i++) {
                for(let ii = rowPointer; ii <= 1; ii++) {
                    // don't check point it's on
                    // console.log({i, ii})
                    if(i === 0 && ii === 0) {
                        continue;
                    }
                    if(y+i < 0 || y+i >= yBound|| x+ii < 0 || x + ii >= xBound || arrInput[y+i][x+ii] === ".") {
                        // console.log("empty element at %s, %s", y+i, x+ii);
                        freeCellCount++;
                    } else {
                        // console.log("No empty element at %s, %s",y+i, x+ii )
                    }
                    // if out of bounds, add as an empty tile
                }
            }
            if(freeCellCount > 4) {
                count++;
            }
            // console.log("Free cell count: %s", freeCellCount);
            // console.log("BREAK")
        })
    })
    return count;
}

async function part2(input) {
    //todo
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
