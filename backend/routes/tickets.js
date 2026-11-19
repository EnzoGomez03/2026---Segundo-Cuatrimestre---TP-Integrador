import { Router } from "express";
import { generarTicket } from "../controllers/ticketController.js";

const router = Router();

router.get("/:id/ticket", generarTicket);

export default router;