import express from "express";
import cvMain from "./cvMain";
const router = express.Router();

router.use("/main", cvMain);

export default router;
