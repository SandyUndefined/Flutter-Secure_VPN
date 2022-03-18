import { body } from 'express-validator';
const nameValidator = body('name').notEmpty().withMessage(' Name should not be empty');
const userNameValidator = body('username').notEmpty().withMessage('User Name should not be empty');
const passwordValidator = body('password').notEmpty().withMessage('Password should not be empty');
const configScriptTCPValidator = body('configScriptTCP').notEmpty().withMessage('configScriptTCP should not be empty');

export const AddVPnValidator = [nameValidator, userNameValidator, passwordValidator, configScriptTCPValidator];
