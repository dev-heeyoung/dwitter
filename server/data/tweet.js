let tweets = [
    {
        id: '1',
        text: 'dream coder',
        createdAt: new Date().toString(),
        userId: '1'
    },
    {
        id: '2',
        text: 'Hi',
        createdAt: new Date().toString(),
        userId: '1'.
    }
]

export async function getAll() {
    return tweets;
}

export async function getByUwername(username) {
    return tweets.filter(tweet => tweet.username === username);
}

export async function getById(id) {
    return tweets.find(tweet => tweet.id == id);
}

export async function create(text, name, username) {
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: Date.now(),
        name,
        username
    }
    tweets = [tweet, ...tweets];
    return tweet;
}

export async function update(id, text) {
    const tweet = tweets.find(tweet => tweet.id == id);
    if (tweet) {
        tweet.text = text;
    }
    return tweet;
}

export async function remove(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
}