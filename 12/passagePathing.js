import treatInput from '../treatInput.js';

const exampleInput = treatInput('./passagePathing_exampleInput').map(string => string.split('-'));

const oneWayRegexp = new RegExp('^[a-z]');
const bothWaysRegexp = new RegExp('^[A-Z]');

class CaveNetwork {
    constructor() {
        this.connectedCaves = {}
    }

    addCave(cave) {
        if(!this.connectedCaves[cave]) {
            this.connectedCaves[cave] = [];
        }
    }

    addConnection(origin, destination) {
        if (!this.connectedCaves[origin]) {
            this.addCave(origin)
        }
        if (!this.connectedCaves[destination]) {
            this.addCave(destination)
        }
        this.connectedCaves[origin].push(destination);
        this.connectedCaves[destination].push(origin);
    }

}

const drawCavesMap = (input) => {
    const caveMap = new CaveNetwork();
    for (const array of input) {
        caveMap.addConnection(array[0], array[1])
    }
    return caveMap;
}

const getRoutes = (input) => {
    const caveMap = drawCavesMap(input);
    const routesArray = [];

    
}

console.log(drawCavesMap(exampleInput))