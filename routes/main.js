import express from "express";
import * as mainControllers from "../controllers/mainControllers.js"

const router = express.Router();


router.route('/').get(mainControllers.getIndexPage);



export default router;