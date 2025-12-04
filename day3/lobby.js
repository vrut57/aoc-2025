const fs = require('node:fs');
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
    return input.map((ele) => {
        const arr = ele.split('');
        const max = Math.max(...arr.slice(0, arr.length - 1).map(Number));
        let candidates = [];
        for(let i = 0; i < arr.length - 1; i++) {
            if(parseInt(arr[i]) === max) {
                const max2 = Math.max(...arr.slice(i + 1).map(Number)).toString();
                candidates.push(arr[i] + max2)
            }
        }
        return Math.max(...candidates.map(Number));
    })
    .reduce((acc, ele) => acc + ele, 0)
}

function part2(input) {
    return input.map((ele) => {
        const arr = ele.split('');
        let result = [];
        const max = Math.max(...arr.slice(0, arr.length - 12).map(Number));
        let starts = [];
        arr.forEach((e, i) => {
            if(parseInt(e) === max && i < arr.length - 12){
                starts.push(i+1);
                result.push([max.toString()]);
            }
        })
        starts.forEach((x, i) => {
            let remainingLength = 11;
            while(remainingLength > 0) {
                // console.log("Result: %s", result[i]);
                // console.log("slicing array at index %s and %s, starting index: %s", starts[i], arr.length - remainingLength, starts[i])
                // console.log(starts[i], arr.length - remainingLength)
                // console.log(arr.slice(starts[i], arr.length - remainingLength + 1))
                const segmentMax = Math.max(...arr.slice(starts[i], arr.length - remainingLength + 1).map(Number)).toString();
                // set pointer of starts to index of that segmentMax
                // console.log("Segment Max = %s, Index is %s", segmentMax, arr.slice(starts[i]).indexOf(segmentMax) + 1);
                // need to check all indexes, not just the single one
                starts[i] = starts[i] + arr.slice(starts[i]).indexOf(segmentMax) + 1;
                result[i].push(segmentMax);
                remainingLength--;
            }
        })
        // console.log({result})
        // console.log(result.map(r => r.join("")));
        // console.log(Math.max(...result.map(r => Number(r.join("")))));
        return Math.max(...result.map(r => Number(r.join(""))))
            
    }).reduce((acc, ele) => acc + ele, 0);
}


async function main() {
    const input = await processInput("input.txt");
    const result1 = await part1(input);
    console.log("Part 1 answer: %s", result1);

    const result2 = await part2(input);
    console.log("Part 2 answer: %s", result2);
}


if (require.main === module) {
    main();
}

module.exports = {processInput, part1, part2}