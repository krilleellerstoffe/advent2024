const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    //create a list from the data
    const lines = data.trim().split('\n');

    const rows = lines.length;
    const cols = lines[0].length;

    console.log('Rows:', rows);
    console.log('Cols:', cols);

    //find all X's in the grid
    const xPositions = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (lines[i][j] === 'X') {
                xPositions.push([i, j]);
            }
        }
    }

    //now see if they can traverse the grid in any direction (up, down, left, right, diagonal) to make 'XMAS'
    const xmas = 'XMAS';

    xPositions.forEach(element => {
        if(element[0] + 3 < rows) {
            let found = true;
            for (let i = 0; i < 4; i++) {
                if (lines[element[0] + i][element[1]] !== xmas[i]) {
                    found = false;
                    break;
                }
            }
            if (found) {
                console.log('Found XMAS at:', element[0], element[1]);
            }
        }
        
    });
});