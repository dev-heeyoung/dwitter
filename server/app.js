import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import tweetsRouter from './router/tweets.js'
import authRouter from './router/auth.js'
import { config } from './config.js'
import { initSocket } from './connection/socket.js'
import { sequelize } from './db/database.js'

const app = express();

const corsOption = {
    origin: config.cors.allowedOrigin,
    optionSucessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOption));
app.use(morgan('tiny'));
app.use(helmet());

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter)

app.use((req, res, next) => {
    res.sendStatus(404);
}) 

app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
})

sequelize.sync().then(() => {
    const server = app.listen(config.port, () => {
        console.log(`listening on ${config.port}`);
    });
    initSocket(server);
})

