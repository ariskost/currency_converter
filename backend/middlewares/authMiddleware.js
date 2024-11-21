const jwt = require('jsonwebtoken');

exports.authenticateJWT = (request, response, next) => {
    const token = request.header('Authorization')?.split(' ')[1];

    if (!token) {
        return response.status(403).json({ error: 'Access denied' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return response.status(403).json({ error: 'Invalid token' });
        }
        request.user = user;
        next();
    });
};
