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

function distance(point1, point2) {
    const [x1, y1, z1] = point1.split(",").map(Number);
    const [x2, y2, z2] = point2.split(",").map(Number);
    return Math.sqrt((Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2) + Math.pow((z2 - z1), 2)));
}

function part1(input, topX) {
    const distances = new Map();
    for(let i = 0; i < input.length; i++) {
        const point = input[i];
        for(let ii = i + 1; ii < input.length; ii++) {
            const compPoint = input[ii];
            const d = distance(point, compPoint);
            distances.set([i, ii].join(","), d)
        }
    }
    const arr = Array.from(distances);
    let circuits = [];
    const subset = arr.sort(([_, a], [__, b]) => {
        return a - b
    }).slice(0, topX)
    for(let i = 0; i < subset.length; i++) {
        let hasMatch = false;
        let matches = [];
        const [box1, box2] = subset[i][0].split(",");
        if(circuits.length == 0) {
            circuits.push(new Set([box1, box2]))
        }
        for(let j = 0; j < circuits.length; j++) {
            if(circuits[j].has(box1) || circuits[j].has(box2)) {
                circuits[j] = new Set([...circuits[j], box1, box2])
                hasMatch = true;
                matches.push(j);
            }
        }
        if(matches.length === 0) {
            circuits.push(new Set([box1, box2]))
        }
        if(matches.length > 1) {
            // merge two circuits that both have match
            const r = circuits.filter((_, i) => matches.indexOf(i) !== -1)
            const combined = r.reduce((acc, curr) => {
                return new Set([...acc, ...curr])
            }, new Set())

            circuits = circuits.filter((_, i) => matches.indexOf(i) === -1);
            circuits.push(new Set([...combined]))
        }        
    }
    return circuits.sort((a, b) => b.size - a.size).filter((_, i) => i < 3).reduce((acc, ele) => acc * ele.size, 1)
}

function part2(input) {
    const distances = new Map();
    for(let i = 0; i < input.length; i++) {
        const point = input[i];
        for(let ii = i + 1; ii < input.length; ii++) {
            const compPoint = input[ii];
            const d = distance(point, compPoint);
            distances.set([i, ii].join(","), d)
        }
    }
    const arr = Array.from(distances);
    let circuits = [];
    let subset = arr.sort(([_, a], [__, b]) => {
        return a - b
    })

    let connections = 1;
    const [box1, box2] = subset[0][0].split(",");
    circuits.push(new Set([box1, box2]));
    let connectionsToCheck = [];

    while(circuits[0].size !== input.length && connections < subset.length) {
        connectionsToCheck = subset.slice(connections, connections + 1);
        let hasMatch = false;
        let matches = [];
        const [box1, box2] = connectionsToCheck[0][0].split(",");
        for(let j = 0; j < circuits.length; j++) {
            if(circuits[j].has(box1) || circuits[j].has(box2)) {
                circuits[j] = new Set([...circuits[j], box1, box2])
                hasMatch = true;
                matches.push(j);
            }
        }
        if(matches.length === 0) {
            circuits.push(new Set([box1, box2]))
        }
        if(matches.length > 1) {
            // merge two circuits that both have match
            const r = circuits.filter((_, i) => matches.indexOf(i) !== -1)
            const combined = r.reduce((acc, curr) => {
                return new Set([...acc, ...curr])
            }, new Set())

            circuits = circuits.filter((_, i) => matches.indexOf(i) === -1);
            circuits.push(new Set([...combined]))
        }        
        connections++;
    }
    const [point1, point2] = subset[connections - 1 ][0].split(",").map(Number);
    const x1 = input[point1]
    const x2 = input[point2]
    return x1.split(",")[0] * x2.split(",")[0];
}


module.exports = { processInput, part1, part2 };