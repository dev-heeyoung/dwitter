import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetsRouter from './router/tweets.js'

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());

app.use('/tweets', tweetsRouter);
app.listen(8080, () => {
    console.log('listening on 8080');
});

app.use((req, res, next) => {
    res.sendStatus(404);
}) 

app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
})