import fs from 'fs';

const treatInput = (path) => {
    return fs.readFileSync(path).toString().split('\r\n').map(string => string.split('').map(number => +number));
}

const exampleInput = treatInput('./smokeBasin_exampleInput');
const puzzleInput = treatInput('./smokeBasin_puzzleInput');

const pointExists = (point, input) => {
    switch(point.orientation) {
        case 'N':
            return point.x >= 0;
            break;
        case 'S':
            return point.x < (input.length);
            break;
        case 'W':
            return point.y >= 0;
            break;
        case 'E':
            return point.y < (input[point.x].length);
            break;
    }
}

const getNSEW = (x, y, input) => {
    const points = [
        {
            orientation: 'N',
            x: x - 1,
            y: y
        },
        {
            orientation: 'S',
            x: x + 1,
            y: y
        },
        {
            orientation: 'E',
            x: x,
            y: y + 1
        },
        {
            orientation: 'W',
            x: x,
            y: y - 1
        },
    ]
    let nsew = [];
    for ( const point of points ) {
        if ( pointExists(point, input) ) {
            nsew.push({ value: input[point.x][point.y], x: point.x, y: point.y })
        }
    }
    return nsew;
}

const getLowPoints = (input) => {
    const lowPoints = [];
    for (let x = 0; x < input.length; x++) {
        for (let y = 0; y < input[x].length; y++) {
            const nsew = getNSEW(x, y, input);
            let point = input[x][y];
            let count = nsew.length;
            for (const object of nsew) {
                if (object.value > point) {
                    count--
                }
            }
            if (count === 0) {
                lowPoints.push({ value: point, x: x, y: y })
            }
        }
    }
    return lowPoints
}

const computeRisk = (input) => {
    const lowPoints = getLowPoints(input).map(object => object.value +1)
    return lowPoints.reduce((a, b) => (a + b))
}

const getBasins = (input) => {
    const lowPoints = getLowPoints(input);
    let basins = [];

    for (let i = 0; i < lowPoints.length; i++) {
        let basinPoints = [lowPoints[i]];
        input[lowPoints[i].x][lowPoints[i].y] = 'X'
        let counter = 0;
        while (basinPoints.length > 0) {
            const nsew = getNSEW(basinPoints[0].x, basinPoints[0].y, input);
            for (const point of nsew) {
                if ((point.value < 9) && (input[point.x][point.y] !== 'X')) {
                    basinPoints.push(point)
                    input[point.x][point.y] = 'X';
                }
            }
            counter++;
            basinPoints.shift();
        }
        if (!basins[2] || (basins[2] < counter)) {
            basins[2] = counter;
            basins.sort((a, b) => b - a)
        }
    }

    return basins.reduce((a, b) => a * b)
}

// console.log(exampleInput)

// console.log(computeRisk(exampleInput));
console.log(getBasins(exampleInput))
console.log(getBasins(puzzleInput))
// console.log(computeRisk(puzzleInput));