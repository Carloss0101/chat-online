import { validarToken } from "../services/jwtService.js";

export function autenticar(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            mensagem: "Usuário não autenticado."
        });
    }

    const payload = validarToken(token);

    if (!payload) {
        return res.status(401).json({
            mensagem: "Token inválido ou expirado."
        });
    }

    req.usuario = payload;
    console.log("payload middleware: ", payload);
    next();
}

export function autenticarIndex(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/login");
    }

    const payload = validarToken(token);

    if (!payload) {
        return res.redirect("/login");
    }

    req.usuario = payload;
    console.log("payload middleware: ", payload);
    next();
}