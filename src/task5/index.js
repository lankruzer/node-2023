import http from 'http';
import {appRouter} from "./routers/appRouter.js";

const requestListener = (req, res) => {
    console.log('req.method = ', req?.method);
    console.log('req.url = ', req?.url);
    console.log('req.query = ', req?.query);
    console.log('req.params = ', req?.params);

    return appRouter(req, res);
};

const server = http.createServer(requestListener);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});