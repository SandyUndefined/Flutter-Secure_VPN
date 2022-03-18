import { Request, Response, NextFunction } from 'express';
import asyncHandeler from 'express-async-handler';
// import jwt from 'jsonwebtoken';
// import { getRepository } from 'typeorm';
// import { User } from '../entity/User.entity';

const isAuth = asyncHandeler(async (req: Request, res: Response, next: NextFunction) => {
    // const bearerHeader = req.headers['authorization'];
    // if (bearerHeader) {
    if (req.user != null) {
        next();
        // const bearer = bearerHeader.split(' ');
        // const bearerToken = bearer[1];
        // jwt.verify(bearerToken, process.env.JWT_SECRET!, async (err, authData) => {
        //     if (err) {
        //         console.log(err);
        //         return res.status(403).json({ error: 'forbidden' });
        //     }
        //     const userRepo = getRepository(User);
        //     const user = await userRepo.findOne({
        //         where: {
        //             email: authData ? ['id'] : String
        //         }
        //     });
        //     if (user) {
        //         req.user = user;
        //     }
        //     next();
        // });
    } else {
        res.statusCode = 403;
        throw 'Unauthorize Response';
    }
});

export default isAuth;
