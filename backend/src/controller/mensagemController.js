import {criarMensagem, getMensagemByID, getMensagens} from "../services/mensagemService.js"
import {getWebSocket} from "../config/webSocket.js";

export async function enviarMensagem(req, res) {
    try {
        const {mensagem} = req.body;

        const userId = req.usuario.id;

        const resposta = await criarMensagem(userId, mensagem);

        if(resposta.status != 200) {
            return res.status(resposta.status).json(resposta.mensagem);
        }

        const wss = getWebSocket();

        wss.clients.forEach((client) => {
            client.send(JSON.stringify({
                tipo: "novaMensagem",
                dados: resposta.mensagem
            }));
        });
        
        return res.status(201).json(resposta.mensagem);
    } catch (err) {
        console.error("Ocorreu um erro ao enviar a mensagem: ", err);
        return res.status(500).json("Ocorreu um erro no servidor.");
    }
}

export async function getMensagem(req, res) {
    try {
        const { id } = req.params;
        const resMensagens =  await getMensagemByID(id);

        if(resMensagens.status != 200) {
            return res.status(resMensagens.status).json(resMensagens);
        }

        return res.status(200).json(resMensagens.dados);
    } catch (err) {
        console.error("Ocorreu um erro no getMensagem: ", err);
        return res.status(500).json("Ocorreu um erro no servidor.");
    }
}

export async function getTodasMensagem(req, res) {
    try {
        const resMensagens =  await getMensagens();

        if(resMensagens.status != 200) {
            return res.status(resMensagens.status).json(resMensagens.mensagem);
        }

        return res.status(200).json(resMensagens.dados);
    } catch (err) {
        console.error("Ocorreu um erro no getTodasMensagem: ", err);
        return res.status(500).json("Ocorreu um erro no servidor.");
    }
}