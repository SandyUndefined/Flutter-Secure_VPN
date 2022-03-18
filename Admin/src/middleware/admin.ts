import { Request, Response, NextFunction } from 'express';
import asysnchandeler from 'express-async-handler';

const isAdmin = asysnchandeler(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user);
    if (req.user != null) {
        if (req.user.role === 'admin') {
            next();
        } else {
            res.statusCode = 403;
            throw 'Unauthorize Response';
        }
    } else {
        res.statusCode = 403;
        throw 'Unauthorize Response';
    }
});

export default isAdmin;
