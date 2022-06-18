import express, { Router } from 'express';
import { body } from 'express-validator';
import * as authController from '../controller/auth.js'
import { validate } from '../middleware/validator.js'
import { isAuth } from '../middleware/auth.js'


const router = express.Router();

const validateCredential = [
    body('username')
        .trim()
        .isLength({min: 3})
        .withMessage('Username should be at least 3 characters'),
    body('password')
    .trim()
    .isLength({min: 5})
    .withMessage('Password should be at least 5 characters'),
    validate
];

const validateSignup = [
    body('name')
        .trim()
        .isLength({min: 3})
        .withMessage('Name should be at least 3 characters'),
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email'),
    body('url')
        .isURL()
        .withMessage('Invalid url')
        .optional({ nullable: true, checkFalsy: true }),
        validate
]

router.post('/signup', validateSignup, authController.signup);

router.post('/login', validateCredential, authController.login);

router.get('/me', isAuth, authController.me);

export default router;