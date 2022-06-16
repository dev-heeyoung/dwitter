import * as tweetData from '../data/tweet.js';

export async function getTweets(req, res) {
    const username = req.query.username;
    const data = await (username? tweetData.getByUwername(username)
    : tweetData.getAll());
    res.status(200).json(data);
}

export async function getTweet(req, res) {
    const tweetId = req.params.id;
    const tweet = await tweetData.getById(tweetId);

    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({message: `Tweet id:${tweetId} not found`});
    }
}

export async function createTweet (req, res) {
    const { text, name, username } = req.body;
    const tweet = await tweetData.create(text, name, username);
    res.status(201).json(tweet);
}

export async function updateTweet(req, res) {
    const tweetId = req.params.id;
    const text = req.body.text;
    const tweet = await tweetData.update(tweetId, text);

    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({message: `Tweet id:${tweetId} not found`});
    }    
}

export async function deleteTweet(req, res) {
    const tweetId = req.params.id;
    await tweetData.remove(tweetId);
    res.sendStatus(204);
}