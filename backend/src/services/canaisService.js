import prisma from '../config/prisma.js';

export async function obterCanais() {
    try {
        const canais = await prisma.chat.findMany({
            orderBy: {
                nome: "asc"
            }
        });

        return {status: 200, dados: canais};

    } catch (error) {
        console.error("Erro ao buscar canais:", error);

        return {status: 500, mensagem: "Erro interno ao buscar canais."};
    }
}