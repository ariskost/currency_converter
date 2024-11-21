const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const users = [
    {
        username: 'admin',
        password: bcrypt.hashSync('password123', 10), // Pre-hashed password
    },
];

exports.login = (request, response) => {
    const { username, password } = request.body;

    const user = users.find((u) => u.username === username);
    if (!user) {
        return response.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return response.status(401).json({ error: 'Invalid credentials' });
    }

    // JWT
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    response.json({ token });
};
