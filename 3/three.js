const { Console } = require('console');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const commands = data.trim().match(/do\(\)|don\'t\(\)|mul\(\d{1,3},\d{1,3}\)/g);

    let sum = 0;
    let enabled = true;

    if (commands) {
        commands.forEach(command => {
            console.log('Command:', command);
            if (command === 'do()') {
                enabled = true;
            } else if (command === 'don\'t()') {
                enabled = false;
            } else if (command.startsWith('mul(') && enabled) {
            const match = command.match(/\d{1,3}/g);
                if (match) {
                    const num1 = parseInt(match[0], 10);
                    const num2 = parseInt(match[1], 10);
                    
                    sum += num1 * num2;
                }
            }
        });
    } else {
        console.log('No matches found');
    }

    console.log('Sum:', sum);
});