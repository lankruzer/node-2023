import {notFoundErrorHandler} from "../handlers/notFoundErrorHandler.js";
import {
    getAllUsersHandler,
    getUserByIdHandler,
    getUserHobbiesByIdHandler,
    createUser,
    deleteUserByIdHandler,
    updateUserByIdHandler,
    addHobbyToUserByIdHandler, deleteHobbyToUserByIdHandler
} from "../handlers/usersHandler.js";

export const usersRouter = (req, res) => {
    const method = req?.method;
    const urlParts = req?.url?.split('/');
    const userId = urlParts[2];
    const isHobbies = urlParts[3] === 'hobbies';

    if (req.url === '/users' && method === 'GET') {
        return getAllUsersHandler(req, res);
    }

    if (req.url === '/users' && method === 'POST') {
        return createUser(req, res);
    }

    if (userId && !isHobbies && method === 'GET') {
        return getUserByIdHandler(req, res, userId);
    }

    if (userId && !isHobbies && method === 'PATCH') {
        return updateUserByIdHandler(req, res, userId);
    }

    if (userId && !isHobbies && method === 'DELETE') {
        return deleteUserByIdHandler(req, res, userId);
    }

    if (userId && isHobbies && method === 'GET') {
        return getUserHobbiesByIdHandler(req, res, userId);
    }

    if (userId && isHobbies && method === 'POST') {
        return addHobbyToUserByIdHandler(req, res, userId);
    }

    if (userId && isHobbies && method === 'DELETE') {
        return deleteHobbyToUserByIdHandler(req, res, userId);
    }


    return notFoundErrorHandler(req, res);
};