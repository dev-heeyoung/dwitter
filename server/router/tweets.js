import express, { Router } from 'express';

const router = express.Router();

let tweets = [
    {
        id: '1',
        text: 'dream coder',
        createdAt: Date.now().toString(),
        name: 'Bob',
        username: 'bob',
        url: 'https://widgetwhats.com/router/uploads/2019/11/free-profile-photo-whatsrouter-1.png'
    },
    {
        id: '2',
        text: 'Hi',
        createdAt: Date.now().toString(),
        name: 'Ellie',
        username: 'ellie',
        url: 'https://widgetwhats.com/router/uploads/2019/11/free-profile-photo-whatsrouter-1.png'
    }
]

router.get('/', (req, res, next) => {
    const username = req.query.username;
    const data = username? tweets.filter(t => t.username === username) : tweets;
    res.status(200).json(data);
})

router.get('/:id', (req, res, next) => {
    const tweetId = req.params.id;
    const tweet = tweets.find(t => t.id == tweetId);

    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({message: `Tweet id:${tweetId} not found`});
    }
});

router.post('/', (req, res, next) => {
    const { text, name, username } = req.body;
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: Date.now(),
        name,
        username
    }
    tweets = [tweet, ...tweets];
    res.status(201).json(tweet);
});

router.put('/:id', (req, res, next) => {
    const tweetId = req.params.id;
    const text = req.body.text;
    const tweet = tweets.find(t => t.id == tweetId);
    console.log(tweet);
    if (tweet) {
        tweet.text = text;
        res.status(200).json(tweet);
    } else {
        res.status(404).json({message: `Tweet id:${tweetId} not found`});
    }    
})

router.delete('/:id', (req, res, next) => {
    const tweetId = req.params.id;
    tweets = tweets.filter(t => t.id != tweetId);
    res.sendStatus(204);
});

export default router;