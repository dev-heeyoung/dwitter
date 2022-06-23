import { db } from '../db/database.js';
import * as userData from './user.js'

const JOIN_QUERY = 'SELECT tweets.id, text, createdAt, userId, username, name, url FROM tweets JOIN users ON userId = users.id';
const ORDER_QUERY = 'ORDER BY createdAt DESC';

export async function getAll() {
    return db.
        execute(`${JOIN_QUERY} ${ORDER_QUERY}`)
        .then(result => result[0]);
}

export async function getByUsername(username) {
    return db.
        execute(`${JOIN_QUERY} WHERE username=? ${ORDER_QUERY}`, [username])
        .then(result => result[0]);
}

export async function getById(id) {
    return db.
        execute(`${JOIN_QUERY} WHERE tweets.id=?`, [id])
        .then(result => result[0][0]);
}

export async function create(text, userId) {
    return db
        .execute(
            'INSERT INTO tweets (text, createdAt, userId) VALUES (?,?,?)', [text, new Date(), userId])
        .then(result => getById(result[0].insertId));
}

export async function update(id, text) {
    return db
        .execute(
            'UPDATE tweets SET text=? WHERE id=?', [text, id])
            .then(result => getById(id));
}

export async function remove(id) {
    return db
        .execute(
            'DELETE FROM tweets WHERE id=?', [id]);
}