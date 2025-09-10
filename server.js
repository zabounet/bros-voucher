import dotenv from "dotenv"
dotenv.config();
import express from "express";
import DB from './config/db.js';
import usersRoute from "./routes/users.route.js";

import nodemailer from 'nodemailer';
import { google } from 'googleapis';
const port = 8081;
const app = express();

//Connect to db
DB();

// Middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    next();
});

// Routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", usersRoute);

app.post('/sendEmail', async (req, res) => {
    await sendEmail(req.body.email, req.body.subject, req.body.body)
    res.sendStatus(200);
}) 

async function sendEmail(email, subject, body) {
    const ID = process.env.ID;
    const SECRET = process.env.SECRET;
    const REFRESH = process.env.REFRESH;
    const SENDEREMAIL = process.env.SENDEREMAIL;

    const oAuth2Client = new google.auth.OAuth2(
        ID,
        SECRET,
        'http://localhost:5050' //<--- redirect URL
    );
      
    oAuth2Client.setCredentials({
        refresh_token: REFRESH
    });

    const accessToken = await oAuth2Client.getAccessToken()

    const transporterOptions = {
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: SENDEREMAIL,
            clientId: ID,
            clientSecret: SECRET,
            refreshToken: REFRESH,
            accessToken: accessToken
        }
    };

    const transporter = nodemailer.createTransport(transporterOptions, {})

    transporter.sendMail({
        from: SENDEREMAIL,
        to: email,
        subject: subject,
        html: body
    }, (err, info) => {
        console.log(email);
        if(err) {
            console.log(err)
        } else {
            console.log(info)
        }
    }
    )
}

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

export default app;
