import { Router } from "express";
import AppointmentController from "../controllers/AppointmentController.js";


const router = Router();
const controller = new AppointmentController();

router.post("/api/appointment", controller.store);
router.get("/api/appointment", controller.getAllAppointments);
router.get("/api/appointment/:date", controller.getDayAppointments);

export default router;