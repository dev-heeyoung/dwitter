import MongoDb from 'mongodb';
import { getTweets } from '../db/database.js'
import * as userData from './user.js'
const ObjectId = MongoDb.ObjectId;


export async function getAll() {
    return getTweets()
    .find()
    .sort({createdAt: -1})
    .toArray()
    .then(mapTweets)
} 

export async function getByUsername(username) {
    return getTweets()
    .find({ username })
    .sort({createdAt: -1})
    .toArray()
    .then(mapTweets);
}

export async function getById(id) {
    return getTweets()
    .findOne({_id: new ObjectId(id)})
    .then(mapOptionalTweet);
}

export async function create(text, userId) {
    const { name, username, url } = await userData.findById(userId);
    const tweet = {
        text,
        createdAt: new Date(),
        userId,
        name,
        username,
        url
    };
    return getTweets()
    .insertOne(tweet)
    .then(result => getById(result.insertedId.toString()));
}

export async function update(id, text) {
    return getTweets()
    .findOneAndUpdate(
        {_id: new ObjectId(id)},
        {$set: {text}},
        {returnDocument: 'after'}
    )
    .then(result => mapOptionalTweet(result.value));
}

export async function remove(id) {
    return getTweets()
    .deleteOne({ _id: new ObjectId(id)});
}

function mapOptionalTweet(tweet) {
    return tweet ? { ...tweet, id: tweet._id.toString() } : tweet;
}

function mapTweets(tweets) {
    return tweets.map(mapOptionalTweet);
}
