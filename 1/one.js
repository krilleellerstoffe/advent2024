//first get the lists from the txt file

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'input.txt');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    //create an array for each list
    const lines = data.trim().split('\n');
    const array1 = [];
    const array2 = [];

    //parse the lists into the arrays
    lines.forEach(line => {
        const [num1, num2] = line.split(/\s+/).map(Number);
        array1.push(num1);
        array2.push(num2);
    });

    // console.log('Array 1:', array1);
    // console.log('Array 2:', array2);

    //sort the arrays
    array1.sort((a, b) => a - b);
    array2.sort((a, b) => a - b);

    // find the difference between each matching index in the arrays
    var sum = 0;
    array1.forEach((num1, index1) => {
        sum += Math.abs(num1 - array2[index1]);
        // console.log('Num1:', num1, 'Num2:', array2[index1], 'Diff:', Math.abs(num1 - array2[index1]));
        }
    );
    console.log('Sum:', sum);

    //calculate the similarity between the arrays (ie. sum each occurance of a number, which exists in the first array, in the second array)
    var similarity = 0;
    array1.forEach((num1, index1) => {
        var countIn2 = 0;
        array2.forEach(num2 => {
            if (num1 === num2) {
                countIn2+=num1;
            }
        });
        // console.log('Num1:', num1, 'CountIn2:', countIn2);
        similarity += countIn2;
    });

    console.log('Similarity:', similarity);
});