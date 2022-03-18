import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import asyncHandeler from 'express-async-handler';
import { User } from '../entity/User.entity';
import jwt from 'jsonwebtoken';
import passwordTool from '../config/hashPassword';

export default class UserController {
    login = asyncHandeler(async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await getConnection().manager.findOne(User, {
            where: {
                email: email
            }
        });
        if (user) {
            const comparePassword = await passwordTool.matchPassword(password, user.password);
            if (comparePassword) {
                jwt.sign({ id: user.id }, process.env.JWT_SECRET!, function (err: any, token: any) {
                    if (err) {
                    } else {
                        res.json({
                            success: true,
                            data: {
                                token,
                                user: {
                                    firstname: user.firstName,
                                    lastname: user.lastName,
                                    email: user.email,
                                    role: user.role
                                }
                            }
                        });
                    }
                });
            } else {
                res.statusCode = 400;
                throw 'User or password not found';
            }
        } else {
            res.status(401);
            throw 'User not exists';
        }
    });

    register = asyncHandeler(async (req: Request, res: Response) => {
            const { email, password, firstname, lastname } = req.body;
            console.log(req.body);
            const users = await getConnection().manager.find(User);
            let isAdmin = false;
            if (users.length == 0) {
                isAdmin = true;
            }

            const user = await getConnection().manager.findOne(User, {
                where: {
                    email: email
                }
            });
            if (user) {
                res.status(401);
                throw 'User already Exists';
            } else {
                try {
                    let user = new User();
                    user.email = email;
                    user.password = await passwordTool.hashPassword(password);
                    user.firstName = firstname;
                    user.lastName = lastname;
                    user.role = isAdmin ? 'admin' : 'normal';
                    await getConnection().manager.save(user);
                    const newUser = await getConnection().manager.findOne(User, {
                        where: {
                            email: email
                        }
                    });
                    res.json({
                        success: true,
                        message: 'Successfully created User',
                        user: newUser
                    });
                } catch (err) {
                    console.log(err);
                    res.statusCode = 500;
                    throw 'Something went wrong';
                }
            }
    });
    
    me = (req: Request, res: Response) => {
        res.json(req.user);
    };
    getAll = asyncHandeler(async (req: Request, res: Response) => {
        const users = await getConnection().manager.find(User);
        res.json({
            success: true,
            users
        });
    });
    changePassword = asyncHandeler(async (req: Request, res: Response) => {
        const user = req.user;
        const { password } = req.body;
        const hashedPassword = await passwordTool.hashPassword(password);
        

    })
    update = asyncHandeler(async (req: Request, res: Response) => {
        
    })
    delete = asyncHandeler(async (req:Request,res:Response)=>{})
}