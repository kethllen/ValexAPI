import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import * as errorsUtils from "../src/utils/errorUtils"
//import battleRouter from "./routers/battleRouter.js";

const app = express();
app.use(json());
app.use(cors());
//app.use(battleRouter);
app.use(errorsUtils.errors);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Running on " + PORT);
});
