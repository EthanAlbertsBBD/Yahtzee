const https = require('https');
require('dotenv').config();

const loginMiddleware = (req, res, next) => {
    const loginData = {
        email: req.body.email,
        password: req.body.password,
    };

    const options = {
        protocol: 'https:',
        method: 'POST',
        hostname: process.env.AUTH_SERVER_HOST,
        path: '/login',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const request = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            const {accessToken, refreshToken} = JSON.parse(data);
            res.cookie('accessToken', accessToken, {httpOnly: true, secure: true});
            next();
        });
    });

    request.on('error', (error) => {
        console.error('Request failed:', error);
        res.status(500).send('Login failed');
    });

    request.write(JSON.stringify(loginData));
    request.end();
};

const registerMiddleware = (req, res, next) => {
    const clientData = {
        email: req.body.email,
        password: req.body.password,
    };

    const options = {
        protocol: 'https:',
        method: 'POST',
        hostname: process.env.AUTH_SERVER_HOST,
        path: '/register',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const request = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            const {accessToken, refreshToken} = JSON.parse(data);
            res.cookie('accessToken', accessToken, {httpOnly: true, secure: true});
            next();
        });
    });

    request.on('error', (error) => {
        console.error('Request failed:', error);
        res.status(500).send('User registration failed');
    });

    request.write(JSON.stringify(clientData));
    request.end();
}

module.exports = {loginMiddleware, registerMiddleware};
