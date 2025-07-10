import express from "express";
const router = express.Router();
const cvMainController = require("../../controllers/cvController/cvMainController");

router.get("/", cvMainController.getDataForMain);

export default router;
