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
    let count = 0;
    let beamIndices = [];
    input.forEach((ele, i) => {
        const row = ele.split("");
        let newIndexs = [];
        if(beamIndices.length === 0) {
            beamIndices.push([input[0].split("").indexOf("S")])
        } else {
            beamIndices[i - 1].forEach((x) => {
                    if(row[x] === ".") {
                        newIndexs.push(x);
                    } else if (row[x] === "^") {
                        count += 1
                        newIndexs.push(x-1, x+1)
                    }
            })
            beamIndices.push([...new Set(newIndexs)])
        }
    })
    return count;
}

function part2(input) {
    const paths = Array(input[0].length).fill(0);
    input.forEach((row) => {
        row.split("").forEach((ele, i) => {
            if(ele === 'S') {
                paths[i] = 1;
            }
            if(ele === "^") {
                paths[i-1] += paths[i]
                paths[i+1] += paths[i]
                paths[i] = 0;
            }
        })
    })
    return paths.reduce((acc, ele) => acc + ele)
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