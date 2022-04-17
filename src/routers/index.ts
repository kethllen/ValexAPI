import { Router } from "express";
import cardRouter from "./cardRouter.js";
import rechargeRouter from "./rechargeRouter.js";
import paymentRouter from "./paymentRouter.js";

const routers = Router();

routers.use(cardRouter);
routers.use(rechargeRouter);
routers.use(paymentRouter);

export default routers;
