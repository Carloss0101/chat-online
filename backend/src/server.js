import express from "express";
import cors from "cors";
import http from "http";
import { initWebSocket } from "./config/webSocket.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = 8080

import messageRoutes from "./routes/mensagemRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import pageRoutes from "./routes/pagesRoutes.js";
import canaisRoutes from "./routes/canaisRoutes.js";
import prisma from "./config/prisma.js";

const server = http.createServer(app);

initWebSocket(server);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../frontend")));

app.use("/api/auth", authRoutes);
app.use("/api/mensagem", messageRoutes);
app.use("/api/canais", canaisRoutes);

app.use(pageRoutes);

async function start() {
    try {
        await prisma.$connect();

        console.log("✅ Banco conectado");

        server.listen(port, () => {
            console.log(`🚀 Servidor rodando na porta ${port}`);
        });

    } catch (error) {
        console.error("Erro ao conectar ao banco:", error);
    }
}

start();