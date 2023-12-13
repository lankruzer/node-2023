import fs from "fs";

export const notFoundErrorHandler = (req, res) => {
    if (req?.url !== '/404') {
        res.writeHead(302, {
            'Location': '/404'
        });
        res.end();
    } else {
        fs.readFile('src/task5/views/404.html', (err, html) => {
            if (err) {
                throw err;
            }

            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.write(html);
            res.end();
        });
    }
};
