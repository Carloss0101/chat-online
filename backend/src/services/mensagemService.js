import prisma from '../config/prisma.js';

export async function criarMensagem(userId, mensagem, chat) {
    if (!userId) return { mensagem: "Usuário inválido!", status: 401 };

    if (!mensagem || mensagem.trim().length === 0 || mensagem.length > 255) {
        return { mensagem: "Mensagem inválida!", status: 401 };
    }

    if (!chat || isNaN(chat)) return { mensagem: "Canal inválido!", status: 400 };

    try {
        const novaMensagem = await prisma.mensagem.create({
            data: {
                user_id: Number(userId),
                chat_id: Number(chat),
                mensagem: mensagem.trim()
            },
            include: {
                usuario: {
                    select: {
                        username: true
                    }
                }
            }
        });

        return { mensagem: novaMensagem, status: 200 };
    } catch (error) {
        console.error("Erro ao salvar mensagem no banco:", error);

        if (error.code === "P2003") {
            return { mensagem: "Usuário ou canal não encontrado.", status: 400 };
        }

        return { mensagem: "Erro interno ao salvar no banco.", status: 500 };
    }
}

export async function getMensagemByID(idMensagem) {
    if (!idMensagem) {
        return { mensagem: "ID da mensagem é obrigatório.", status: 400 };
    }

    try {
        const mensagemEncontrada = await prisma.mensagem.findUnique({
            where: {
                id: parseInt(idMensagem) 
            },
        });

        if (!mensagemEncontrada) {
            return { mensagem: "Mensagem não encontrada.", status: 404 };
        }

        return { status: 200, dados: mensagemEncontrada };

    } catch (error) {
        console.error("Erro ao buscar mensagem por ID no banco:", error);
        return { mensagem: "Erro interno ao buscar no banco.", status: 500 };
    }
}

export async function getMensagensByChat(chatId) {
    try {
        if (!chatId) {
            return { mensagem: "ID da mensagem é obrigatório.", status: 400 };
        }
        const historico = await prisma.mensagem.findMany({
            where: {
                chat_id: Number(chatId)
            },
            orderBy: {
                data_hora: "asc"
            },
            include: {
                usuario: {
                    select: {
                        username: true
                    }
                }
            }
        });

        return {status: 200,dados: historico};

    } catch (error) {
        console.error("Erro ao buscar histórico de mensagens:", error);

        return {status: 500,mensagem: "Erro interno ao buscar histórico no banco."};
    }
}