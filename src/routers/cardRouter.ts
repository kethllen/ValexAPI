import { Router } from 'express';
import validapiKeyMiddleware from "../middlewares/validaApiKeyMiddleware.js";
import validaSchemaMiddleware from '../middlewares/validaSchemaMiddleware.js';
import * as cardController from '../controllers/cardController.js';
import cardSchema from '../schemas/cardSchema.js';
import cardActivateSchema from '../schemas/cardActivateSchema.js';

const cardRouter = Router();

cardRouter.post(
	'/card',
	validapiKeyMiddleware,
	validaSchemaMiddleware(cardSchema),
  cardController.createCard
);
cardRouter.put('/card/:cardId/activate', validaSchemaMiddleware(cardActivateSchema), cardController.activateCard);
cardRouter.get('/card/:cardId/balance', cardController.balanceCard);

export default cardRouter;