import VpnController from '../controller/vpn.controller';
import { Router } from 'express';
import auth from '../middleware/auth';
import admin from '../middleware/admin';
import { AddVPnValidator } from '../validator/vpnValidator';

const router = Router();

const vpnController = new VpnController();

router.get('/vpns', vpnController.getAll);
router.get('/countries', vpnController.getCountries);

router.post('/vpns', admin, AddVPnValidator, vpnController.addVpn);
router.put('/vpns/:id', admin, AddVPnValidator, vpnController.editVpn);
router.delete('/vpns/:id', admin, vpnController.deleteVpn);

export default router;
