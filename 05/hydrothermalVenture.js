import fs from 'fs';
import { get } from 'http';

const treatVentInput = (path) => {
    const array = fs.readFileSync(path).toString().split('\r\n');
    for (let i = 0; i < array.length; i++) {
        array[i] = array[i].split(' -> ').map(coordinate => coordinate.split(','))
    }
    return array;
}

/*
 treatedInput if array of arrays of arrays of strings [i][y][z]
    i[
        y[
            z['',''],
            ['','']
        ],
        [
            ['',''],
            ['','']
        ]
    ]
*/

// const getMaxXY = (input) => {
//     const output = [0, 0]
//     for (const element of input.flat(1)) {
//         if (+element[0] > output[0]) {output[0] = +element[0]}
//         if (+element[1] > output[1]) {output[1] = +element[1]}
//     }
//     return output;
// }

//array passed to getVerticalLines // getHorizontalLines of format [[x, y],[x, y]]
const getHorizontalLines = (array) => {
    const outputArray = [];
    const x1 = array[0][0];
    const x2 = array[1][0];
    const y1 = array[0][1];
    const y2 = array[1][1];
    if (x1 === x2) {
        if (+y1 > +y2) {
            for (let i = +y2; i <= +y1; i++) {
                outputArray.push([x1, String(i)])
            }
        } else {
            for (let i = +y1; i <= +y2; i++) {
                outputArray.push([x1, String(i)])
            }
        }
        return outputArray
    }
    return false;
}

const getVerticalLines = (array) => {
    const outputArray = [];
    const x1 = array[0][0];
    const x2 = array[1][0];
    const y1 = array[0][1];
    const y2 = array[1][1];
    if (y1 === y2) {
        if (+x1 > +x2) {
            for (let i = +x2; i <= +x1; i++) {
                outputArray.push([String(i), y1])
            }
        } else {
            for (let i = +x1; i <= +x2; i++) {
                outputArray.push([String(i), y1])
            }
        }
        return outputArray;
    }
    return false;
}

const getDiagonalLines = (array) => {
    const outputArray = [];
    let x1 = array[0][0];
    let x2 = array[1][0];
    let y1 = array[0][1];
    let y2 = array[1][1];
    if (+x1 > +x2) {
        x1 = x2;
        x2 = array[0][0];
        y1 = y2;
        y2 = array[0][1]
    }
    if (Math.abs(+x1 - +x2) === Math.abs(+y1 - +y2)) {
        if (((+y2 - +y1) / (+x2 - +x1)) > 0) {
            for (let i = 0; i <= Math.abs(+x2 - +x1); i++) {
                outputArray.push([String(+x1 + i), String(+y1 + i)])
            }
        } else {
            for (let i = 0; i <= Math.abs(+x1 - +x2); i++) {
                outputArray.push([String(+x1 + i), String(+y1 - i)])
            }
        }
        return outputArray;
    }
    return false;
}


const getLines = (input) => {
    const outputArray = []
    for (const element of input) {
        if (getDiagonalLines(element)) {
            outputArray.push(getDiagonalLines(element))
        } else if (getHorizontalLines(element)) {
            outputArray.push(getHorizontalLines(element))
        } else if (getVerticalLines(element)) {
            outputArray.push(getVerticalLines(element))
        }
    }
    return outputArray.flat(1);
}




const getOverlappingPoints = (input) => {
    let output = {}
    for (const element of getLines(input)) {
        let x = element[0];
        let y = element[1];
        output[`${x}_${y}`] ? output[`${x}_${y}`]++ : output[`${x}_${y}`] = 1
    }
    let counter = 0;
    for (const entry in output) {
        if (output[entry] >= 2) {
            counter += 1
        }
    }
    return counter;
}



const exampleInput = treatVentInput('./hydrothermalVenture_exampleInput');
const puzzleInput = treatVentInput('./hydrothermalVenture_puzzleInput');

// console.log(puzzleInput);
console.log(getOverlappingPoints(exampleInput));
console.log(getOverlappingPoints(puzzleInput));
