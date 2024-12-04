//first get the lists from the txt file

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

    let sumSafe = 0;

    //returns -1 if safe, or the problematic index
    function isValid(array) {
        if (array.length < 2) return -1;
        const increasing = array[1] > array[0];
        for (let i = 1; i < array.length; i++) {
            if ((increasing && array[i] <= array[i - 1]) || (!increasing && array[i] >= array[i - 1])) {
                return i-1;
            } else if (Math.abs(array[i] - array[i - 1]) > 3 || Math.abs(array[i] - array[i - 1]) < 1) {
                return i-1;
            }
        }
        return -1;
    }

    lines.forEach(line => {
        const array = line.split(/\s+/).map(Number);
        let safe = isValid(array);
        let buffer = true;
        console.log('Array:', array, safe);
        if (safe != -1 && buffer == true) { //if buffer exists, remove invalid element and retry
            buffer = false;
            let foundValid = false;
            for (let i = 0; i < array.length; i++) {
                const newArray = array.slice(0, i).concat(array.slice(i + 1));
                if (isValid(newArray) == -1) {
                    foundValid = true;
                    break;
                }
            }
            if (foundValid) {
                sumSafe++;
            }
        } else if (safe == -1) {
            sumSafe++;
        }
        
        
    });
    console.log('Safe:', sumSafe);
});

