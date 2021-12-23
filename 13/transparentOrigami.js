import fs from 'fs';

const treatInput = (path) => {
    const array = fs.readFileSync(path).toString().split('\r\n');
    const coordinates = array.filter(string => string.match(/([0-9]+,[0-9]+)/)).map(string => string.split(',').map(number => +number));
    const foldingIndications = array.filter(string => string.match(/^fold.*/)).map(string => string.replace('fold along ', '').split('='))
    return { coordinates: coordinates, folding: foldingIndications };

}

const exampleInput = treatInput('./exampleInput');
const puzzleInput = treatInput('./puzzleInput');

const foldAlongY = (coordinates, y) => {
    let output = coordinates;
    for (let i = 0; i < output.length; i++) {
        if (output[i][1] === y) {
            output[i] = null
        } else if (output[i][1] > y) {
            output[i][1] = y + (y - output[i][1])
        }
    }
    output = output.filter(array => array.length > 0)
    return output;
}

const foldAlongX = (coordinates, x) => {
    let output = coordinates;
    for (let i = 0; i < output.length; i++) {
        if (output[i][0] === x) {
            output[i] = null
        } else if (output[i][0] > x) {
            output[i][0] = x + (x - output[i][0])
        }
    }
    output = output.filter(array => array.length > 0)
    return output;
}

const foldPaperOnce = (input) => {
    const { coordinates, folding } = input;
    let output = coordinates;
    folding[0][0] === 'y' ? output = foldAlongY(coordinates, +folding[0][1]) : output = foldAlongX(coordinates, +folding[0][1]);
    output = output.map(array => array.join(','));
    const counter = { points: [] };
    for (const value of output) {
        if (!counter.points.includes(value)) {
            counter.points.push(value);
        }
    }
    return counter.points.length;
}

const foldPaper = (input) => {
    const { coordinates, folding } = input;
    let output = coordinates;
    for (const fold of folding) {
        fold[0] === 'y' ? output = foldAlongY(coordinates, +fold[1]) : output = foldAlongX(coordinates, +fold[1]);
    }
    output = output.map(array => array.join(','));
    const counter = { points: [] };
    for (const value of output) {
        if (!counter.points.includes(value)) {
            counter.points.push(value);
        }
    }
    return counter.points.map(string => string.split(','));
}

const drawGrid = (input) => {
    const coordinates = foldPaper(input).map(array => array.map(string => +string));
    let maxX = 0;
    let maxY = 0;
    for (const point of coordinates) {
        if (point[0] > maxX) {
            maxX = point[0]
        }
        if (point[1] > maxY) {
            maxY = point[1]
        }
    }
    const grid = [];
    for (let i = 0; i < coordinates.length; i++) {
        if (!grid[coordinates[i][1]]) { grid[coordinates[i][1]] = [] };
        grid[coordinates[i][1]][coordinates[i][0]] = '#';
    }
    for (const array of grid) {
        for (let i = 0; i < array.length; i++) {
            array[i] !== '#' ? array[i] = ' ' : array[i]
        }
    }
    return grid.map(array => array.join(' ')).join('\r\n');
}

console.log(exampleInput)
console.log(drawGrid(exampleInput))
console.log(drawGrid(puzzleInput))
