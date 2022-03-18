import e, { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import asyncHandeler from 'express-async-handler';
import { Vpn } from '../entity/Vpns.entity';
import countries from '../datas/countries';
import { validationResult } from 'express-validator';

export default class VpnController {
    getAll = asyncHandeler(async (req: Request, res: Response) => {
        let filter = {
            deleted: false,
            active: true
        };
        if (req.query.paid) {
            filter['paid'] = req.query.paid === 'true' ? true : false;
        }
        if (req.user) {
            if (req.user.role == 'admin') {
                delete filter['active'];
            }
        }
        const vpns = await getConnection().manager.find(Vpn, { where: filter });
        res.json({
            success: true,
            vpns
        });
    });
    getFlag = (country) => {
        let countryCode = '';
        countries.forEach((element) => {
            if (element.name === country) countryCode = element.code.toLowerCase();
        });
        return countryCode;
    };
    addVpn = asyncHandeler(async (req: Request, res: Response) => {
        const errors = validationResult(req);

        console.log(errors);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array()[0]['msg'] });
        }
        const { name, country, username, password, configScriptTCP, configScriptUDP, paid } = req.body;

        const vpn = new Vpn();

        vpn.name = name;
        vpn.country = country;
        vpn.flagLogo = this.getFlag(country);
        vpn.username = username;
        vpn.password = password;
        vpn.configScriptTCP = configScriptTCP;
        vpn.configScriptUDP = configScriptUDP;
        await getConnection().manager.save(vpn);
        res.status(201).json({
            success: true,
            vpn
        });
    });
    deleteVpn = asyncHandeler(async (req: Request, res: Response) => {
        var userType = req.user.role;
        const id = req.params.id;
        var connection = getConnection();
        var filter = {
            id: id,
            deleted: false
        };
        if (userType === 'superadmin') {
            delete filter['deleted'];
        }

        var vpn = await connection.manager.findOne(Vpn, {
            where: filter
        });
        if (vpn) {
            if (userType == 'superadmin') {
                await getConnection().createQueryBuilder().delete().from(Vpn).where('id=:id', { id: vpn.id }).execute();
            } else {
                vpn.deleted = true;
                await connection.manager.createQueryBuilder().update(Vpn).set({ deleted: true }).where('id=:id', { id: vpn.id }).execute();
            }
            res.status(204).json({
                success: true,
                message: 'Successfully deleted vpn'
            });
        } else {
            res.statusCode = 400;
            throw "Vpn with this id doesn't exists";
        }
    });
    editVpn = asyncHandeler(async (req: Request, res: Response) => {
        const errors = validationResult(req);

        console.log(errors);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array()[0]['msg'] });
        }
        const { name, country, username, password, configScriptTCP, configScriptUDP, paid } = req.body;
        const id = req.params.id;
        var connection = getConnection();
        var filter = {
            id: id,
            deleted: false
        };
        const vpn = await connection.manager.findOne(Vpn, {
            where: filter
        });
        if (vpn) {
            await connection.manager.createQueryBuilder().update(Vpn).set({ name, country, username, password, configScriptTCP, paid }).where('id=:id', { id: vpn.id }).execute();
            const updatedVpn = await connection.manager.findOne(Vpn, { where: { id } });
            res.status(200).json({
                success: true,
                vpn: updatedVpn
            });
        } else {
            res.statusCode = 400;
            throw "Vpn doesn't exists";
        }
    });

    getCountries = asyncHandeler(async (req: Request, res: Response) => {
        const countriesList = countries.map((e) => e.name);
        res.json(countriesList);
    });
}
