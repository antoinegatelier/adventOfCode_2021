import treatInput from '../treatInput.js';

const exampleInput = treatInput('./dive_exampleInput');
const puzzleInput = treatInput('./dive_puzzleInput');

const calculatePosition = (input) => {
    let x = 0;
    let y = 0;
    for (let i = 0; i < input.length; i++) {
        let command = input[i].split(' ');
        switch(command[0]) {
            case 'forward':
                x += (+command[1]);
                break;
            case 'up':
                y -= (+command[1]);
                break;
            case 'down':
                y += (+command[1]);
                break;
        }
    }
    return x * y;
}

const calculateAimPosition = (input) => {
    let horizontal = 0;
    let depth = 0;
    let aim = 0;
    for (let i = 0; i < input.length; i++) {
        let command = input[i].split(' ');
        switch(command[0]) {
            case 'forward':
                horizontal += (+command[1]);
                depth += (+command[1] * aim);
                break;
            case 'up':
                aim -= (+command[1]);
                break;
            case 'down':
                aim += (+command[1]);
                break;
        }
    }
    return horizontal * depth;
}

console.log(calculateAimPosition(puzzleInput));