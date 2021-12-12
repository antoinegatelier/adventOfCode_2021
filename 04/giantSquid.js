import fs from 'fs';

const treatBingoInput = (path) => {
    const array = fs.readFileSync(path).toString().split('\r\n').filter(string => string.length > 0);
    const output = {};
    output.numbers = array.shift().split(',');
    let y = 1;
    for (let i = 0; i < array.length; i += 5) {
        let name = `grid${y}`;
        output[name] = []
        for (let z = 0; z < 5; z++) {
            output[name].push(array[i + z].split(' ').filter(string => string.length > 0))
        }
        y++;
    }
    return output;
}

const checkRows = (grid) => {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].every(value => typeof value === 'number')) {
            return true;
        }
    }
    return false;
}

const checkColumns = (grid) => {
    for (let i = 0; i < grid[0].length; i++) {
        let column = []
        for (let y = 0; y < grid.length; y++) {
            column.push(grid[y][i]);
        }
        if (column.every(value => typeof value === 'number')) {
            return true;
        }
    }
    return false;
}

const checkGrid = (grid) => {
    if (checkRows(grid) || checkColumns(grid)) {
        return true;
    }
    return false;
}

const checkNumber = (grid, number) => {
    for (let i = 0; i < grid.length; i++) {
        for (let y = 0; y < grid[i].length; y++) {
            if (grid[i][y] === number) {
                grid[i][y] = +grid[i][y]
                return grid;
            }
        }
    }
    return grid;
}

const getWinningScore = (grid) => {
    const array = grid.flat().filter(value => typeof value === 'string').map(string => +string);
    return array.reduce((x, y) => x + y)
}

const getFirstWinningCard = (input) => {
    const { numbers } = input
    const gridNumbers = Object.keys(input).length - 1;

    for (let i = 0; i < numbers.length; i++) {
        for (let y = 1; y <= gridNumbers; y++) {
            input[`grid${y}`] = checkNumber(input[`grid${y}`], numbers[i]);
            if (checkGrid(input[`grid${y}`])) {
                return getWinningScore(input[`grid${y}`]) * +numbers[i]
            }
        }
    }

}

const getLastWinningCard = (input) => {
    const { numbers } = input;
    const gridNumbers = Object.keys(input).length - 1;
    let gridCounter = gridNumbers;

    for (let i = 0; i < numbers.length; i++) {
        for (let y = 1; y <= gridNumbers; y++) {
            if (typeof input[`grid${y}`] !== 'number') {
                input[`grid${y}`] = checkNumber(input[`grid${y}`], numbers[i]);
                if (checkGrid(input[`grid${y}`])) {
                    if (gridCounter > 1) {
                        input[`grid${y}`] = getWinningScore(input[`grid${y}`]) * +numbers[i];
                        gridCounter -= 1;
                    } else {
                        return getWinningScore(input[`grid${y}`]) * +numbers[i]
                    }
                }
            }
        }
    }
}


const exampleInput = treatBingoInput('./giantSquid_exampleInput');
const puzzleInput = treatBingoInput('./giantSquid_puzzleInput');

console.log(getFirstWinningCard(exampleInput));
console.log(getFirstWinningCard(puzzleInput));

console.log(getLastWinningCard(exampleInput));
console.log(getLastWinningCard(puzzleInput));