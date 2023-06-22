require("dotenv").config();
//require("./config/database").connect();
const express = require("express");
const user = require("./model/user");

const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
    try {
        const { email, password} = req.body;

        if (!(email && password)) {
            res.status(400).send("Email and password required");
        }

        // TODO: implement userExists
        if(userExists(email)) {
            return res.status(409).send("A user with that email address already exists");
        }

        // TODO: implement santitizeEmail
        sanitizedEmail = sanitizeEmail(email);
        userId = await bcrypt.hash(sanitizedEmail, 10);
        encryptedPassword = await bcrypt.hash(password, 10);

        //TODO: implement createUser
        const user = createUser(userId, encryptedPassword);

        const token = jwt.sign(
            { user_id: encryptedEmail},
            process.env.TOKEN_KEY,
            { expiresIn: "2h"}
        );

        //TODO: implement saveToken
        saveToken(encryptedEmail, token);

        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
});

app.post("/login", (req, res) => {
    // login logic goes here
})

module.exports = app;