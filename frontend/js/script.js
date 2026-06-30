import { appendMessage, obterHistoricoFormatado } from "./services/mensagemService.js";
import { enviarMensagem } from "./api/mensagemApi.js";

const userId = localStorage.getItem("userId");
const username = localStorage.getItem("username");

console.log(userId);
console.log(username);

document.addEventListener('DOMContentLoaded', async () => {
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');

    document.getElementById("username-menu").innerHTML = username;

    async function renderizarHistorico() {
        const historico = await obterHistoricoFormatado(userId);
        historico.forEach(msg => {
            appendMessage(chatMessages, msg.texto, msg.tipo, msg.nome, msg.data);
        });
    }

    await renderizarHistorico();

    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
        console.log("✅ WebSocket conectado.");
    };

    socket.onmessage = (event) => {
        const resposta = JSON.parse(event.data);

        console.log(resposta);

        const mensagem = resposta.dados;
        appendMessage(
            chatMessages,
            mensagem.mensagem,
            mensagem.user_id == userId ? "sent" : "received",
            mensagem.usuario.username,
            mensagem.data_hora
        );
    };

    socket.onerror = (error) => {
        console.error("Erro no WebSocket:", error);
    };

    socket.onclose = () => {
        console.log("WebSocket desconectado.");
    };

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const messageText = messageInput.value.trim();
        if (messageText === '') return;

        await enviarMensagem(messageText);

        //appendMessage(chatMessages, messageText, 'sent', userName, retornoApi.data_hora);

        messageInput.value = '';
    });


});