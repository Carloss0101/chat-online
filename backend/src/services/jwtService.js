import jwt from 'jsonwebtoken';

export function gerarToken(payload) {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
    } catch (error) {
        console.error("Erro ao gerar o token JWT:", error);
        return null;
    }
}

export function validarToken(token) {
    try {
        if (!token) return null;
        
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        console.error("Erro ao validar o token JWT:", error);
        return null;
    }
}