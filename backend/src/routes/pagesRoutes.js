import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { autenticarIndex } from "../middleware/authMiddleware.js";

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontend = path.join(__dirname, "../../../frontend/html");

router.get("/login", (req, res) => {
    res.sendFile(path.join(frontend, "auth", "login.html"));
});

router.get("/cadastro", (req, res) => {
    res.sendFile(path.join(frontend, "auth", "cadastro.html"));
});

router.get("/cadastro", (req, res) => {
    res.sendFile(path.join(frontend, "auth", "cadastro.html"));
});

router.get("/", autenticarIndex, (req, res) => {
    res.sendFile(path.join(frontend, "index.html"));
});

router.get("/index", autenticarIndex, (req, res) => {
    res.sendFile(path.join(frontend, "index.html"));
});

export default router;