import * as userData from '../data/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config.js'

export async function signup(req, res) {
    const { username, password, name, email, url } = req.body;
    const user = await userData.findByUsername(username);
    if (user) {
        return res.status(409).json({message: `Username: ${username} is already exist`});
    }

    const hashed = await bcrypt.hash( password, config.bcrypt.saltRounds )
    const userId = await userData.createUser({
        username,
        password: hashed,
        name,
        email,
        url,
    })
    const token = createJwtToken(userId);
    res.status(201).json({ token, username });
}

export async function login(req, res) {
    const { username, password } = req.body;
    const user = await userData.findByUsername(username);
    if (!user) {
        return res.status(401).json({message: `Invalid username or password`})
    }

    const isValidPassword = await bcrypt.compare( password, user.password );
    if (!isValidPassword) {
        return res.status(401).json({message: `Invalid username or password`})
    }

    const token = createJwtToken(user.id);
    res.status(200).json({ token, username })
}

export function createJwtToken(id) {
    return jwt.sign({id}, config.jwt.secretKey, {expiresIn: config.jwt.expiresInSec});
}

export async function me(req, res) {
    const user = await userData.findById(req.userId);
    if(!user) {
        return res.status(404).json( {message: 'User not found'});
    }
    res.status(200).json({token: req.token, username: user.username});
}