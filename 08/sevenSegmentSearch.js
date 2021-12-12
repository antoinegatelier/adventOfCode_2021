import fs from 'fs';

const treatInput = (path) => {
    return fs.readFileSync(path).toString().split('\r\n');
}

const exampleInput = treatInput('./sevenSegmentSearch_exampleInput');
const puzzleInput = treatInput('./sevenSegmentSearch_puzzleInput');

const splitValues = (input) => {
    const output = [];
    for (const string of input) {
        output.push(string.split(' ').filter(text => text !== '|'))
    }
    return output;
};

const countUniqueValues = (input) => {
    const segmentedStrings = splitValues(input);
    let twos = 0;
    let fours = 0;
    let sevens = 0;
    let eights = 0;
    for (const array of segmentedStrings) {
        for (let i = array.length - 1; i > array.length - 5; i--){
            switch(array[i].length) {
                case 2:
                    twos++;
                    break;
                case 3:
                    sevens++;
                    break;
                case 4:
                    fours++;
                    break;
                case 7:
                    eights++;
                    break;
                default:
                    break;
            }
        }

    }
    return twos + fours + sevens + eights;
}

const getTargetString = (array, target, includes = true) => {
    for (let i = 0; i < array.length; i++) {
        let segments = target.length;
        for (const segment of target) {
            if (array[i].includes(segment)) {
                segments--
            }
        }
        if (includes && segments === 0) {
            return i;

        }
        if (!includes && segments !== 0) {
            return i;
        }
    }
}

const getOutputs = (input) => {
    const segmentedStrings = splitValues(input);
    let outputArray = [];
    for (const array of segmentedStrings) {
        let values = new Array(10);
        let index = 0;
        array.map(string => string.split(''))
        const outputs = array.splice(10, 4).map(string => string.split('').sort().join(''));
        array.sort((a, b) => a.length - b.length);
                values[1] = array.shift().split('');
        values[7] = array.shift().split('');
        values[4] = array.shift().split('');
        values[8] = array.pop().split('');
        const arrayOfFives = array.splice(0, 3);
        index = getTargetString(arrayOfFives, values[7]);
        values[3] = arrayOfFives.splice(index, 1)[0].split('');
        const segmentsBD = values[4].filter(string => string !== values[1][0]).filter(string => string !== values[1][1]);
        if ( arrayOfFives[0].includes(segmentsBD[0]) && arrayOfFives[0].includes(segmentsBD[1]) ) {
            values[5] = arrayOfFives[0].split('');
            values[2] = arrayOfFives[1].split('');
        } else {
            values[5] = arrayOfFives[1].split('');
            values[2] = arrayOfFives[0].split('');
        }
        index = getTargetString(array, values[5], false)
        values[0] = array.splice(index, 1)[0].split('');
        index = getTargetString(array, values[1])
        values[9] = array.splice(index, 1)[0].split('')
        values[6] = array[0].split('');
        values = values.map(array => array.sort().join(''));
        const result = [];
        for (const output of outputs) {
            result.push(values.findIndex(value => value === output))
        }
        outputArray.push(result);
    }
    outputArray = outputArray.map(array => +array.join(''))
    return outputArray.reduce((a, b) => a + b);
}


// console.log(exampleInput)
// console.log(countUniqueValues(exampleInput))
console.log(getOutputs(exampleInput))
console.log(getOutputs(puzzleInput))