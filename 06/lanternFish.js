import fs from 'fs';

const treatInput = (path) => {
    return fs.readFileSync(path).toString().split(',').map(string => +string);
}

const newDay = (array) => {
    const existingFishes = [];
    const newFishes = [];
    for (const fish of array) {
        if ( fish === 0) {
            existingFishes.push(6);
            newFishes.push(8);
        } else {
            existingFishes.push(fish - 1)
        }
    }
    return existingFishes.concat(newFishes);
}

const breedFishes = (array, days) => {
    while(days > 0) {
        console.log(days, array)
        array = newDay(array);
        days--
    }
    return array.length;
}

const breedFishFamily = (input, days) => {
    let count = 0;
    for (const fish of input) {
        count += breedFishes([fish], days)
    }
    return count;
}

const groupFishes = (input) => {
    const groups = new Array(9).fill(0);
    for (const fish of input) {
        groups[fish]++
    }
    return groups;
}

const breedFishGroups = (input, days) => {
    let groups = groupFishes(input);
    while (days > 0) {
        let groupsNewDays = new Array(9).fill(0);
        for (let i = 0; i < groups.length; i++) {
            if( i === 0) {
                groupsNewDays[8] = groups[i];
                groupsNewDays[6] = groups[i];
            } else {
                groupsNewDays[i - 1] += groups[i]
            }
        }
        groups = groupsNewDays;
        days--;
    }
    return groups.reduce((a, b) => a + b);
}

const exampleInput = treatInput('lanternFish_exampleInput');
const puzzleInput = treatInput('lanternFish_puzzleInput');

// console.log(exampleInput);
// console.log(breedFishFamily(exampleInput, 18))
// console.log(breedFishFamily(puzzleInput, 80))
// console.log(breedFishFamily(puzzleInput, 256))

console.log(breedFishGroups(exampleInput, 256))
console.log(breedFishGroups(puzzleInput, 256))

// console.log(breedFishes([1], 256))