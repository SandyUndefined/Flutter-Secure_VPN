import { Request, Response, NextFunction } from 'express';
import asyncHandeler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { getConnection, getRepository } from 'typeorm';
import { User } from '../entity/User.entity';

const isAuth = asyncHandeler(async (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, process.env.JWT_SECRET!, async (err, authData) => {
            if (err) {
                return res.status(403).json({ error: 'forbidden' });
            }
            const user = await getConnection().manager.findOne(User, {
                where: {
                    id: authData['id']
                }
            });
            if (user) {
                req.user = user;
            } else {
                req.user = null;
            }
            next();
        });
    } else {
        req.user = null;
        next();
    }
});

export default isAuth;
