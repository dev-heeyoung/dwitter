//password: abcd1234
let users = [{
    id: '1',
    username: 'bob',
    password: '$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm',
    name: 'Bob',
    email: 'bob@gmail.com',
    url: 'https://widgetwhats.com/router/uploads/2019/11/free-profile-photo-whatsrouter-1.png'
}];

export async function findByUsername(username) {
    return users.find(user => user.username === username);
}

export async function findById(id) {
    return users.find(user => user.id === id);
}

export async function createUser(user) {
    const newUser = { ...user, id: Date.now().toString() };
    users.push(newUser);
    return newUser.id;
}
