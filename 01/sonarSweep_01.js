import treatInput from "../treatInput.js";

// Array of strings
const exampleInput = treatInput('./sonarSweep_exampleInput');
const puzzleInput = treatInput('./sonarSweep_puzzleInput');

// Loop through Array starting at Index 1, to compare if index -1 > index - if so, increase counter by 1

const depthMeasurement = (input) => {
    let counter = 0;
    for (let i = 1; i < input.length; i++) {
        if(+input[i] > +input[i - 1]) {
            counter += 1
        }
    }
    return counter;
}

// Loop through Array starting at Index 1, to compare if Sum(i, ..., i+2) > Sum(i-1, ..., i+1) - if so, increase counter by 1

const depthWindowMeasurement = (input) => {
    let counter = 0;
    for (let i = 1; i < input.length - 2; i++) {
        let sum1 = (+input[i-1]) + (+input[i]) + (+input[i+1]);
        let sum2 = (+input[i]) + (+input[i+1]) + (+input[i+2]);
        if(sum2 > sum1) {
            counter += 1;
        }
    }
    return counter;
}