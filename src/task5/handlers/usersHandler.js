import {notFoundErrorHandler} from "./notFoundErrorHandler.js";

let users = [
    {
        id: 1,
        name: 'name1',
        email: 'email1@gmail.com',
        hobbies: ['books', 'sport']
    }
];

const findUserIndexById = (userId) => {
    return users.findIndex(({ id }) => id === +userId);
};

const findUserById = (userId) => {
    return users.find(({ id }) => id === +userId);
};

const formatUserData = ({ id, name, email }, withLinkToGetHobbies = false) => {
    const user = {
        id,
        name,
        email
    };

    if (withLinkToGetHobbies) {
        user.linkToGetHobbies = `<a href='/users/${id}/hobbies'>get hobbies</a>`;
    }

    return user;
};


const formatUsersData = (withLinkToGetHobbies = false) => {
    return users.map((user) => formatUserData(user, withLinkToGetHobbies));
};

export const getAllUsersHandler = (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(JSON.stringify(formatUsersData(true)));
};

export const createUser = (req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {
        body = JSON.parse(body);

        users.push({
            id: users.length + 1,
            name: body?.name,
            email: body?.email,
            hobbies: body?.hobbies || [],
        })

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(JSON.stringify(formatUsersData()));
    });
};

export const getUserByIdHandler = (req, res, userId) => {
    const foundUser = findUserById(userId);

    if (foundUser) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(JSON.stringify(formatUserData(foundUser, true)));
        return;
    }

    return notFoundErrorHandler(req, res);
}

export const updateUserByIdHandler = (req, res, userId) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {
        body = JSON.parse(body);


        const userIndex = findUserIndexById(userId);

        if (userIndex !== -1) {
            users[userIndex] = {
                ...users[userIndex],
                name: body?.name || users[userIndex]?.name,
                email: body?.email || users[userIndex]?.email,
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(JSON.stringify(formatUsersData()));
            return;
        }

        return notFoundErrorHandler(req, res);
    });
};

export const deleteUserByIdHandler = (req, res, userId) => {
    const foundUser = findUserById(userId);

    if (foundUser) {
        users = users.filter(({ id }) => id !== +userId);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(JSON.stringify(formatUsersData()));
        return;
    }

    return notFoundErrorHandler(req, res);
}


export const addHobbyToUserByIdHandler = (req, res, userId) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {
        body = JSON.parse(body);
        const newHobby = body?.hobby;

        const userIndex = findUserIndexById(userId);

        if (userIndex !== -1) {
            if (users[userIndex]?.hobbies.includes(newHobby)) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'text/plain');
                res.end(JSON.stringify(`Error: hobby "${newHobby}" already added`));
                return;
            }

            users[userIndex] = {
                ...users[userIndex],
                hobbies: [...users[userIndex]?.hobbies || [], newHobby],
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(JSON.stringify(formatUsersData()));
            return;
        }

        return notFoundErrorHandler(req, res);
    });
};

export const getUserHobbiesByIdHandler = (req, res, userId) => {
    const foundUser = findUserById(userId);

    if (foundUser) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(JSON.stringify(foundUser?.hobbies || []));
        return;
    }

    return notFoundErrorHandler(req, res);
};

export const deleteHobbyToUserByIdHandler = (req, res, userId) => {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {
        body = JSON.parse(body);
        const hobbyToRemove = body?.hobby;

        const userIndex = findUserIndexById(userId);

        if (userIndex !== -1) {
            if (!users[userIndex]?.hobbies.includes(hobbyToRemove)) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'text/plain');
                res.end(JSON.stringify(`Error: user haven't hobby "${hobbyToRemove}"`));
                return;
            }

            users[userIndex] = {
                ...users[userIndex],
                hobbies: users[userIndex]?.hobbies?.filter((hobby) => hobby !== hobbyToRemove),
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(JSON.stringify(formatUsersData()));
            return;
        }

        return notFoundErrorHandler(req, res);
    });
};
