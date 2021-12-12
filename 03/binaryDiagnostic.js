import treatInput from '../treatInput.js';

const exampleInput = treatInput("./binaryDiagnostic_exampleInput");
const puzzleInput = treatInput("./binaryDiagnostic_puzzleInput");

const getGammaRate = (input) => {
    let binaryGamma = '';
    for (let i = 0; i < input[0].length; i++) {
        let zeroBitCounter = 0;
        let oneBitCounter = 0;
        for (let y = 0; y < input.length; y++) {
            +input[y][i] === 1 ? oneBitCounter++ : zeroBitCounter++
        }
        zeroBitCounter > oneBitCounter ? binaryGamma += "0" : binaryGamma += "1"
    }
    return parseInt(+binaryGamma, 2);
}

const getEpsilonRate = (input) => {
    let binaryEpsilon = '';
    for (let i = 0; i < input[0].length; i++) {
        let zeroBitCounter = 0;
        let oneBitCounter = 0;
        for (let y = 0; y < input.length; y++) {
            +input[y][i] === 1 ? oneBitCounter++ : zeroBitCounter++
        }
        zeroBitCounter < oneBitCounter ? binaryEpsilon += "0" : binaryEpsilon += "1"
    }
    return parseInt(+binaryEpsilon, 2);
}

const getPowerConsumption = (input) => {
    const gammaRate = getGammaRate(input);
    const epsilonRate = getEpsilonRate(input);
    return gammaRate * epsilonRate;
}

const getOxygenGeneratorRating = (input) => {
    for (let i = 0; i < input[0].length; i++) {
        if (input.length === 1) {
            return parseInt(input[0], 2);
        }
        let oneBitCount = 0;
        let zeroBitCount = 0;
        for (let y = 0; y < input.length; y++) {
            +input[y][i] === 1 ? oneBitCount++ : zeroBitCount++
        }
        let bitDeterminant = 1;
        if (zeroBitCount > oneBitCount) {
            bitDeterminant = 0;
        }
        input = input.filter(value => +value[i] === bitDeterminant)
    }
    return parseInt(input[0], 2)
}

const getCO2scrubberRating = (input) => {
    for (let i = 0; i < input[0].length; i++) {
        if (input.length === 1) {
            return parseInt(input[0], 2);
        }
        let oneBitCount = 0;
        let zeroBitCount = 0;
        for (let y = 0; y < input.length; y++) {
            +input[y][i] === 1 ? oneBitCount++ : zeroBitCount++
        }
        let bitDeterminant = 0;
        if (oneBitCount < zeroBitCount) {
            bitDeterminant = 1;
        }
        input = input.filter(value => +value[i] === bitDeterminant)
    }
    return parseInt(input[0], 2)
}

const getLifeSupportRating = (input) => {
    const oxygenGeneratorRating = getOxygenGeneratorRating(input);
    const CO2scrubberRating = getCO2scrubberRating(input);
    return oxygenGeneratorRating * CO2scrubberRating;
}

console.log(getLifeSupportRating(puzzleInput));