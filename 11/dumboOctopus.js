import fs from 'fs';

const treatInput = (path) => {
    return fs.readFileSync(path).toString().split('\r\n').map(string => string.split('').map(character => ({value: +character, isFlashed: false})));
}

const exampleInput = treatInput('./dumboOctopus_exampleInput')
const puzzleInput = treatInput('./dumboOctopus_puzzleInput')

const getNeighbours = (x, y, xLength, yLength) => {
    const output = {
        NW: [x - 1, y - 1],
        N: [x - 1, y],
        NE: [x - 1, y + 1],
        E: [x , y + 1],
        SE: [x + 1, y + 1],
        S: [x + 1, y],
        SW: [x + 1, y - 1],
        W: [x, y - 1]
    };
    if (x === 0) { output.NW = output.N = output.NE = null }
    if (y === 0) { output.NW = output.W = output.SW = null }
    if (x === xLength - 1) { output.SW = output.S = output.SE = null }
    if (y === yLength - 1) { output.NE = output.E = output.SE = null }

    return output;
}

const getNextStep = (input) => {
    let score = 0;
    let keepGoing = true;
    let synchronizeScore = 0;

    for (const array of input) {
        for (const object of array) {
            object.value++;
        }
    }

    do {
        keepGoing = false;
        for (let x = 0; x < input.length; x++) {
            for (let y = 0; y < input[x].length; y++) {
                if (input[x][y].value > 9 && !input[x][y].isFlashed) {
                    input[x][y].isFlashed = true;
                    let neighbours = getNeighbours(x, y, input.length, input[x].length);
                    for (const property in neighbours) {
                        let neighbour = neighbours[property];
                        if (neighbour) {
                            input[neighbour[0]][neighbour[1]].value++;
                            if (input[neighbour[0]][neighbour[1]].value > 9) {
                                keepGoing = true;
                            }
                        }
                    }
                }
            }
        }
    } while (keepGoing)

    for (const array of input) {
        for (const object of array) {
            if (object.value > 9) {
                synchronizeScore += 1;
                score += 1;
                object.value = 0;
                object.isFlashed = false;
            }
        }
    }

    synchronizeScore === 100 ? synchronizeScore = true : synchronizeScore = false;

    return { score: score, input: input, synchronized: synchronizeScore };
}

const computeScore = (input, steps) => {
    let data = input.map(value => value);
    let score = 0;
    while (steps > 0) {
        let stepResult = getNextStep(data);
        data = stepResult.input;
        score += stepResult.score;
        steps--
    }
    return score;
}

const computeSynchronization = (input) => {
    let data = input.map(value => value);
    let synchronized = false;
    let steps = 0;
    do {
        let stepResult = getNextStep(data);
        data = stepResult.input;
        synchronized = stepResult.synchronized;
        steps++
    } while (!synchronized)
    return steps;
}

// console.log(computeSynchronization(exampleInput));
// console.log(computeSynchronization(puzzleInput))

console.log(computeScore(exampleInput, 100))
console.log(computeScore(puzzleInput, 100));

