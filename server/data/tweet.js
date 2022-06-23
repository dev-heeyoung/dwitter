import SQ from 'sequelize';
import { sequelize } from '../db/database.js'
import { User } from './user.js'
const DataTypes = SQ.DataTypes;
const Sequelize = SQ.Sequelize;

const Tweet = sequelize.define('tweet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});
Tweet.belongsTo(User);

const INCLUDE_USER = {
    attributes: [
        'id',
        'text',
        'createdAt',
        'userId',
        [Sequelize.col('user.name'), 'name'],
        [Sequelize.col('user.username'), 'username'],
        [Sequelize.col('user.url'), 'url'],
    ],
    include: {
        model: User,
        attributes: []
    }
};

const ORDER = { 
    order: [['createdAt', 'DESC']]
};

export async function getAll() {
    return Tweet.findAll({...INCLUDE_USER, ...ORDER});
}

export async function getByUsername(username) {
    return Tweet.findAll({
        ...INCLUDE_USER,
        ...ORDER,
        include: {
            ...INCLUDE_USER.include,
            where: { username },
        }
    })
}

export async function getById(id) {
    return Tweet.findOne({
        where: {id},
        ...INCLUDE_USER
    });
}

export async function create(text, userId) {
    return Tweet.create({text, userId})
    .then((result => getById(result.dataValues.id)));
}

export async function update(id, text) {
    return Tweet.findByPk(id, INCLUDE_USER)
    .then((result) => {
        result.text = text;
        return result.save();
    })
}

export async function remove(id) {
    return Tweet.findByPk(id)
    .then((result) => {
        result.destroy();
    });
}