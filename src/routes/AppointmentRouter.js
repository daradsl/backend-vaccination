import { Router } from "express";
import AppointmentController from "../controllers/AppointmentController.js";


const router = Router();
const controller = new AppointmentController();

router.post("/appointment", controller.store);

export default router;