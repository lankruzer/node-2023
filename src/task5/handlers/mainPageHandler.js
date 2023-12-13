import fs from 'fs';

export const mainPageHandler = (req, res) => {
    fs.readFile('src/task5/views/index.html', (err, html) => {
        if (err) {
            throw err;
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.write(html);
        res.end();
    });
};
