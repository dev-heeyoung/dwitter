import SQ from 'sequelize';
import { sequelize } from '../db/database.js'
const DataType = SQ.DataTypes;

export const User = sequelize.define('user', {
    id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: DataType.STRING(48),
        allowNull: false
    },
    password: {
        type: DataType.STRING(128),
        allowNull: false
    },
    name: {
        type: DataType.STRING(128),
        allowNull: false
    },
    url: {
        type: DataType.TEXT,
        allowNull: true
    }
},
{timestamps: false},
)

export async function findByUsername(username) {
    return User.findOne({where: {username}});
}

export async function findById(id) {
    return User.findByPk(id);
}

export async function createUser(user) {
    return User.create(user).then(result => result.dataValues.id);
}
