import csvToJson from 'csvtojson';
import fs from 'fs';

const filePath = 'task3/csv/1';

const convertCsvToJson = async (path) => {
    try {
        console.log('convertCsvToJson started for file = ', path);
        const readFileStream = fs.createReadStream(`${path}.csv`);
        const writeFileStream = fs.createWriteStream(`${path}.txt`);

        readFileStream.setEncoding('utf8');

        readFileStream.pipe(csvToJson({ delimiter: 'auto', ignoreColumns: /Amount/ })).pipe(writeFileStream);

        console.log('convertCsvToJson finished');
    } catch (e) {
        console.error('task3 e = ', e);
    }
};

convertCsvToJson(filePath);