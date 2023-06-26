const https = require('https');
require('dotenv').config();

const loginMiddleware = (req, res, next) => {
    const loginData = {
        username: req.body.username,
        password: req.body.password
    };

    const options = {
        method: 'POST',
        hostname: process.env.AUTH_SERVER_HOST,
        port: process.env.AUTH_SERVER_PORT,
        path: '/login',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const request = https.request(options, response => {
        let data = '';

        response.on('data', chunk => {
            data += chunk;
        });

        response.on('end', () => {
            const { accessToken, refreshToken } = JSON.parse(data);
            res.cookie('access_token', accessToken, { httpOnly: true, secure: true });
            next();
        });
    });

    request.on('error', error => {
        console.error('Request failed:', error);
        res.status(500).send('Login failed');
    });

    request.write(JSON.stringify(loginData));
    request.end();
};

module.exports = loginMiddleware;
