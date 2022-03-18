import express, { Request, Response, NextFunction, Errback } from 'express';
import { createConnection, getConnection, getConnectionOptions } from 'typeorm';
import dotenv from './config';
import logging from './config/logging';
import bodyParser from 'body-parser';
import userRouter from './route/user.route';
import vpnRouter from './route/vpn.route';
import user from './middleware/user';
import { User } from './entity/User.entity';
import passwordTool from './config/hashPassword';
const path = require('path');

const NAMESPACE = 'Server';
const app = express();
const PORT = dotenv.server.port;

app.use(bodyParser.json());
// app.use((req: Request, res: Response, next: NextFunction) => {
//     // logging.info(NAMESPACE, req.use);
//     next();
// });
app.use(user);
app.use(express.static(path.join(__dirname, '../../client/build')));
// app.use((req: Request, res: Response, next: NextFunction) => {
//     // console.log(req.user);
// });
app.use('/api', userRouter);
app.use('/api', vpnRouter);
app.use('/api', errorHandler);

app.get('*', (req, res) => {
    console.log(path.join(__dirname, '../../client/build/index.html'));
    res.sendFile(path.join(__dirname));
});

function errorHandler(err: Errback, req: Request, res: Response, next: NextFunction) {
    if (process.env.ENVIRONMENT === 'DEVLOPMENT') {
        console.log(err);
    }
    if (res.statusCode) {
        res.json({
            success: false,
            error: err
        });
    } else {
        res.statusCode = 500;
        res.json({
            success: false,
            error: err
        });
    }
}
const connection = async () => {
    const connectionOptions = await getConnectionOptions();
    // Object.assign(connectionOptions, { entities: [User, Vpn] });
    createConnection()
        .then(async () => {
            const user = await getConnection().manager.findAndCount(User);
            console.log(user);
            if (user[1] === 0) {
                const newUser = new User();
                (newUser.email = 'admin@secureVpn.com'), (newUser.firstName = 'admin');
                newUser.lastName = 'admin';
                newUser.role = 'admin';
                newUser.password = await passwordTool.hashPassword('12345');
                await getConnection().manager.save(newUser);
            }
            logging.info(NAMESPACE, 'Connected to database');
            app.listen(PORT, () => {
                logging.info(NAMESPACE, `server is listining at port ${PORT}`);
            });
        })
        .catch((err) => {
            console.log(err);
            logging.error(NAMESPACE, err);
        });
};

connection();
