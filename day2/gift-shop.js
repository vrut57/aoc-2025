const fs = require('node:fs');

async function readInput(path) {
    const fileStream = fs.createReadStream(path);
    let input = "";
    try {
        for await(const chunk of fileStream) {
            input += chunk.toString('utf8');
        }
    } catch(err) {
        throw Error(err);
    }
    return input.split(",");
}

async function part1(input) {
    const invalid = [];
    input.forEach((range) => {
        const [low, high] = range.split("-");
        for(let i = parseInt(low); i < parseInt(high); i++) {
            const str = i.toString();
            if(str.length % 2 != 0) {
                continue;
            }
            const left = str.slice(0, str.length / 2);
            const right = str.slice(str.length / 2);
            if(parseInt(left) === parseInt(right)) {
                invalid.push(i);
            }
        }
        return low;
    })

    return invalid.reduce((acc, val) => acc + val, 0); // correct answer 13108371860
}

async function part2(input) {
    const invalid = new Set();
    input.forEach((range) => {
        const [low, high] = range.split("-");
        for(let i = parseInt(low); i <= parseInt(high); i++) {
            const str = i.toString();
            const length = str.length;
            const multiples = [];
            for(let m = 2; m <= length; m++) {
                if(length % m === 0) {
                    multiples.push(m);
                }
            }
            multiples.forEach((m) => {
                const segments = [];
                const segmentSize = length / m;
                for(let s = 0; s < length; s += segmentSize) {
                    const seg = str.slice(s, s+segmentSize) ;
                    segments.push(seg);
                }
                if(segments.every(((val) => segments[0] === val))) {
                    invalid.add(i);
                }
            })
        }
        return invalid;
    })
    console.log({invalid});

    return [...invalid].reduce((acc, val) => acc + val, 0);
}

async function main() {
    const input = await readInput("input.txt");
    const result = await part1(input);
    console.log({result});

    const result2 = await part2(input);
    console.log({result2});
}

if (require.main === module) {
    main();
}

module.exports = { readInput, part1, part2}