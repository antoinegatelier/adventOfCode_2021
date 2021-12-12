import fs from 'fs';

const treatInput = (path) => {
    return fs.readFileSync(path).toString().split(',').map(string => +string);
}

const sortArray = (array) => {
    return array.sort((a, b) => a - b)
}

const getPositions = (sortedArray) => {
    const positions = [];
    let lastValue = -1;
    for (const position of sortedArray) {
        if (position > lastValue) {
            positions.push(position);
            lastValue = position;
        }
    }
    return positions;
}

const getMeanValue = (input) => {
    const sortedArray = sortArray(input)
    const meanValue = sortedArray[Math.round(input.length/2)]
    return meanValue
}

const getAverageValue = (input) => {
    const sumOfValues = input.reduce((a, b) => a + b);
    return Math.round(sumOfValues / input.length)
}

// const getNewCost = (oldCost) => {
//     let newCost = 0;
//     while (oldCost > 0) {
//         newCost += oldCost;
//         oldCost--;
//     }
//     return newCost;
// }

// const getCost = (input) => {
//     // const meanValue = getMeanValue(input);
//     const positionCostPairs = []
//     const sortedArray = sortArray(input);
//     const positions = getPositions(sortedArray);

//     for (const position of positions) {
//         let cost = 0;
//         for (const value of input) {
//             cost += Math.abs(value - position);
//         };
//         positionCostPairs.push({ position: position, cost: cost })
//     }
//     positionCostPairs.sort((a, b) => a.cost - b.cost)
//     return positionCostPairs[0].cost;
// }

class Node {
    constructor(position, input) {
        this.position = position;
        this.oldCost = this.getOldCost(input);
        this.newCost = this.getNewCost(input);
    }

    getOldCost(array) {
        let cost = 0;
        for (const value of array) {
            cost += Math.abs(this.position - value)
        }
        return cost;
    }

    getNewCost(array) {
        let newCost = 0;
        for (const value of array) {
            let oldCost = Math.abs(this.position - value)
            while (oldCost > 0) {
                newCost += oldCost;
                oldCost--;
        }
        }
        return newCost;
    }
}

const getCostV2 = (input) => {
    const averageValue = getAverageValue(input);

    let topNode = new Node(averageValue, input);
    let rightNode = new Node(topNode.position + 1, input);
    let leftNode = new Node(topNode.position - 1, input);

    if (topNode.newCost > rightNode.newCost) {
        while(topNode.newCost > rightNode.newCost) {
            topNode = rightNode;
            rightNode = new Node(topNode.position + 1, input);
        }
    }
    if (topNode.newCost > leftNode.newCost) {
        while(topNode.newCost > leftNode.newCost) {
            topNode = leftNode;
            leftNode = new Node(topNode.position - 1, input)
        }
    }

    return topNode.newCost;
}


const exampleInput = treatInput('./whale_exampleInput');
const puzzleInput = treatInput('./whale_puzzleInput');

// console.log(exampleInput)
// console.log(getCost(exampleInput))
console.log(getCostV2(exampleInput))
console.log(getCostV2(puzzleInput))