const { Console } = require('console');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const commands = data.trim().match(/mul\(\d{1,3},\d{1,3}\)/g);

    let sum = 0;

    if (commands) {
        commands.forEach(command => {
            const match = command.match(/mul\((\d{1,3}),(\d{1,3})\)/);
            if (match) {
                const num1 = parseInt(match[1], 10);
                const num2 = parseInt(match[2], 10);
                
                sum += num1 * num2;
            }
        });
    } else {
        console.log('No matches found');
    }

    console.log('Sum:', sum);
});