import express from "express";
import * as userControllers from "../controllers/userControllers.js"

const router = express.Router();


router.route('/login').get(userControllers.getLoginPage).post(userControllers.login);
router.route('/register').post(userControllers.register).get(userControllers.getRegisterPage);
router.route('/logout').post(userControllers.logout);

export default router;