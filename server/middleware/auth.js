import jwt from 'jsonwebtoken';
import * as userData from '../data/user.js'
import { config } from '../config.js'

const AUTH_ERR = {message: 'Authentication Error'};

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if ( !(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json(AUTH_ERR);
    }
    const token = authHeader.split(' ')[1];

    jwt.verify (
        token,
        config.jwt.secretKey,
        async (error, decoded) => {
            if (error) {
                return res.status(401).json(AUTH_ERR);
            }
            const user = await userData.findById(decoded.id);
            if(!user) {
                return res.status(401).json(AUTH_ERR);
            }
            req.userId = user.id;
            next();
        }
  );
}