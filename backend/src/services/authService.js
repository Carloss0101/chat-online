import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import {gerarToken} from '../services/jwtService.js'

export async function cadastrarUsuario(username, email, senha) {
    try {
        if (!username || !email || !senha) {
            return { mensagem: "Todos os campos são obrigatórios.", status: 400 };
        }

        const usuarioExiste = await prisma.usuario.findFirst({
            where: { email }
        });

        if (usuarioExiste) {
            return { mensagem: "Este e-mail já está cadastrado.", status: 400 };
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = await prisma.usuario.create({
            data: {
                username,
                email,
                password_hash: senhaCriptografada
            },
            select: {
                id: true,
                username: true,
                email: true
            }
        });

        return { status: 201, dados: novoUsuario };

    } catch (error) {
        console.error("Erro no serviço de cadastro:", error);
        return { mensagem: "Erro interno no servidor.", status: 500 };
    }
}

export async function loginUsuario(email, senha) {
    try {
        if (!email || !senha) {
            return { mensagem: "E-mail e senha são obrigatórios.", status: 400 };
        }

        const usuario = await prisma.usuario.findUnique({where: { email }});

        if (!usuario) {
            return { mensagem: "Credenciais inválidas.", status: 401 };
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.password_hash);

        if (!senhaCorreta) {
            return { mensagem: "Credenciais inválidas.", status: 401 };
        }

        const token = gerarToken({ id: usuario.id, username: usuario.username });

        return {
            status: 200,
            dados: {
                id: usuario.id,
                username: usuario.username,
                email: usuario.email
            },
            token
        };

    } catch (error) {
        console.error("Erro no serviço de login:", error);
        return { mensagem: "Erro interno no servidor.", status: 500 };
    }
}