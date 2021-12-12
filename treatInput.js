import fs from 'fs';

const treatInput = (path) => {
    return fs.readFileSync(path).toString().split('\r\n');
}

export default treatInput;