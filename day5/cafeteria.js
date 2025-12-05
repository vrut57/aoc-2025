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
    const blankIdx = input.indexOf("");
    const ranges = input.slice(0, blankIdx);
    const ingredients = input.slice(blankIdx + 1);
    return ingredients.reduce((acc, ele) => {
        const c = ranges.some((r) => {
            return Number(ele) >= Number(r.split("-")[0]) && Number(ele) <= Number(r.split("-")[1])
        }) ? 1 : 0;
        return acc + c;
    }, 0)
}

function part2(input) {
    const blankIdx = input.indexOf("");
    const combinedRange = []; // push each range to stack and merge
    const ranges = input.slice(0, blankIdx);
    const sorted = ranges.sort((a, b) =>{
        return Number(a.split("-")[0]) - Number(b.split("-")[0]);
    })
    sorted.forEach((ele) => {
        const low = Number(ele.split("-")[0]);
        const high = Number(ele.split("-")[1]);
        if(combinedRange.length > 0) {
            const prevMax = combinedRange[combinedRange.length -1][1]
            if (low < prevMax && high < prevMax) {
                // range is within the previous range
            }
            else if(low <= prevMax) {
                combinedRange[combinedRange.length-1][1] = Math.max(high, combinedRange[combinedRange.length-1][1]);
            } else {
                combinedRange.push([low, high])
            }
        } else {
            combinedRange.push([low, high])
        }
    })
    return combinedRange.reduce((acc, ele) => acc + (ele[1] - ele[0] + 1), 0)

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