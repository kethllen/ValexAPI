import { Router } from 'express';
import * as rechargeController from "../controllers/rechargeController.js";
import validapiKeyMiddleware from "../middlewares/validaApiKeyMiddleware.js";
import validaSchemaMiddleware from '../middlewares/validaSchemaMiddleware.js';
import rechargeSchema from '../schemas/rechargeSchema.js';

const rechargeRouter = Router();

rechargeRouter.post(
	'/recharge/:cardId',
	validapiKeyMiddleware ,
	validaSchemaMiddleware(rechargeSchema),
	rechargeController.createRecharge
);

export default rechargeRouter;