import { WebSocketServer } from "ws";
import { validarToken } from "../services/jwtService.js";
import cookie from "cookie";
import http from "http";

let wss;

export function initWebSocket(server) {
    wss = new WebSocketServer({ server });

    wss.on("connection", (ws, req) => {
        const cookies = cookie.parse(req.headers.cookie || "");

        const token = cookies.token;
        const usuario = validarToken(token);

        if (!usuario) {
            ws.close();
            return;
        }

        console.log(`${usuario.username} conectou.`);

        ws.on("close", () => {
            console.log(`${usuario.username} desconectou.`);
        });
    });
}

export function getWebSocket() {
    return wss;
}