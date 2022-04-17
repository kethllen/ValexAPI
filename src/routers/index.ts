import { Router } from "express";
import cardRouter from "./cardRouter.js";

const routers = Router();

routers.use(cardRouter);

export default routers;
