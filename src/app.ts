import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/handleErrorMiddleware.js";
import routers from "./routers/index.js";

const app = express();
app.use(json());
app.use(cors());
app.use(routers);
app.use(handleErrorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Running on " + PORT);
});
