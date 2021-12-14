import treatInput from "../treatInput.js";

const exampleInput = treatInput('./syntaxScoring_exampleInput');
const puzzleInput = treatInput('./syntaxScoring_puzzleInput');

const characters = {
    opening: ['(', '{', '<', '['],
    closing: [')', '}', '>', ']']
}

const isLineCorruptedOrIncomplete = (line) => {
    let array = [];
    let corruptCharacters = [];
    for (const character of line) {
        if (characters.opening.includes(character)) {
            array.push(character)
        } else {
            if (characters.closing.indexOf(character) !== characters.opening.indexOf(array[array.length - 1])) {
                corruptCharacters.push(character);
            } else (
                array.pop()
            )
            
        }
    }
    let output = { isCorrupted: false, corruptCharactersArray: [], isIncomplete: false, incompleteCharactersArray: [] };
    if(corruptCharacters.length > 0) {
        output.isCorrupted = true;
        output.corruptCharactersArray = corruptCharacters
    } else if (array.length > 0) {
        output.isIncomplete = true;
        output.incompleteCharactersArray = array;
    }
    return output;
};

const getCorruptedAndIncompleteLines = (input) => {
    const corrupt = [];
    const incomplete = []
    for (let i = 0; i < input.length; i++) {
        let result = isLineCorruptedOrIncomplete(input[i]);
        if(result.isCorrupted) {
            corrupt.push(result.corruptCharactersArray);
        } else if (result.isIncomplete) {
            incomplete.push(result.incompleteCharactersArray)
        }
    }
    return {corrupt: corrupt, incomplete: incomplete};
}

const computeScores = (input) => {
    const sortedInput = getCorruptedAndIncompleteLines(input)
    const corruptCharacters = sortedInput.corrupt;
    const incompleteLines = sortedInput.incomplete
    let corruptScore = 0;
    for (const array of corruptCharacters) {
        switch(array[0]) {
            case ')':
                corruptScore += 3;
                break;
            case '>':
                corruptScore += 25137
                break;
            case ']':
                corruptScore += 57
                break;
            case '}':
                corruptScore += 1197
                break;
        }
    }
    let incompleteScoreArray = [];
    for (const array of incompleteLines) {
        let incompleteScore = 0;
        for (let i = array.length - 1; i >= 0; i--) {
            switch(array[i]) {
                case '(':
                    incompleteScore = incompleteScore * 5 + 1;
                    break;
                case '<':
                    incompleteScore = incompleteScore * 5 + 4;
                    break;
                case '{':
                    incompleteScore = incompleteScore * 5 + 3;
                    break;
                case '[':
                    incompleteScore = incompleteScore * 5 + 2;
                    break;
            }
        }
        incompleteScoreArray.push(incompleteScore);
    }
    incompleteScoreArray.sort((a, b) => a - b);
    return {corruptScore: corruptScore, incompleteScore: incompleteScoreArray[Math.floor(incompleteScoreArray.length / 2)]}
}

console.log(exampleInput)
console.log(computeScores(exampleInput))
console.log(computeScores(puzzleInput))