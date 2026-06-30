import { Router } from "express";
import {enviarMensagem, getMensagem, getTodasMensagem} from "../controller/mensagemController.js"
import { autenticar } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", autenticar, enviarMensagem);
router.get("/", autenticar, getTodasMensagem);
router.get("/:id", autenticar, getMensagem);

export default router;