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
    console.log(input);
    let count = 0;
    let beamIndices = [];
    input.forEach((ele, i) => {
        const row = ele.split("");
        let newIndexs = [];
        if(beamIndices.length === 0) {
            beamIndices.push([input[0].split("").indexOf("S")])
        } else {
            // console.log({beamIndices})
            beamIndices[i - 1].forEach((x) => {
                // console.log({beamIndices})
                // const beamIdx = beamIndices[i - 1];
                    // console.log({beamIdx})
                    // console.log({i, x})
                    if(row[x] === ".") {
                        // keep idx, no change
                        // console.log("No change")
                        // beamIndices.push([...x])
                        newIndexs.push(x);
                    } else if (row[x] === "^") {
                        count += 1
                        // console.log("SPLIT: %s to %s, %s", x, x - 1, x + 1)
                        // beamIndices.push([x - 1, x + 1]);
                        newIndexs.push(x-1, x+1)
                    }
            })
            const z = [...new Set(newIndexs)];
            // count += z.length - beamIndices[i-1];
            beamIndices.push([...new Set(newIndexs)])
        }
        // console.log({beamIndices})
    })
    return count;
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