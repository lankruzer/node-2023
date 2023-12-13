import {notFoundErrorHandler} from "../handlers/notFoundErrorHandler.js";
import {mainPageHandler} from "../handlers/mainPageHandler.js";
import {usersRouter} from "./usersRouter.js";

export const appRouter = (req, res) => {
    if (req.url === '/404') {
        return notFoundErrorHandler(req, res);
    }

    if (req.url === '/') {
        return mainPageHandler(req, res);
    }

    if (req.url?.startsWith('/users')) {
        return usersRouter(req, res);
    }

    return notFoundErrorHandler(req, res);
};