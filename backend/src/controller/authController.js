import { cadastrarUsuario, loginUsuario } from '../services/authService.js';

export async function cadastrar(req, res) {
    try {
        const { username, email, senha } = req.body;

        const resultado = await cadastrarUsuario(username, email, senha);

        if (resultado.status !== 201) {
            return res.status(resultado.status).json({ mensagem: resultado.mensagem });
        }

        return res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso.",
            dados: resultado.dados
        });
    } catch (err) {
        console.error("Ocorreu um erro no cadastro: ", err);
        return res.status(500).json("Ocorreu um erro no servidor.");
    }
}

export async function login(req, res) {
    try {
        const { email, senha } = req.body;

        const resultado = await loginUsuario(email, senha);

        if (resultado.status !== 200) {
            return res.status(resultado.status).json({ mensagem: resultado.mensagem });
        }

        res.cookie('token', resultado.token, {
            httpOnly: true,
            secure: false, 
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({
            mensagem: "Login realizado com sucesso.",
            dados: resultado.dados
        });
    } catch (err) {
        console.error("Ocorreu um erro no login: ", err);
        return res.status(500).json("Ocorreu um erro no servidor.");
    }
}