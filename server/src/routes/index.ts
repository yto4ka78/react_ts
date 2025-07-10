import express from "express";
import cvRoute from "./cv/cvRoute";
const router = express.Router();

router.use("/cv", cvRoute);
//router.use("/market", require("./market/marketRoute"));

export default router;
