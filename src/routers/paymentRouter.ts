import { Router } from "express";
import * as paymentController from "../controllers/paymentController.js";
import validaSchemaMiddleware from '../middlewares/validaSchemaMiddleware.js';
import paymentSchema from "../schemas/paymentSchema.js";

const paymentRouter = Router();

paymentRouter.post('/payment/:cardId', validaSchemaMiddleware(paymentSchema), paymentController.createPayment);

export default paymentRouter;