import { appendMessage, obterHistoricoFormatado } from "./services/mensagemService.js";
import { enviarMensagem } from "./api/api.js";
import { renderizarCanais } from "./services/canaisService.js";
import { mostrarLoading, esconderLoading } from "./services/loadingService.js";

const userId = localStorage.getItem("userId");
const username = localStorage.getItem("username");
let canalAtual = null;

console.log(userId);
console.log(username);

document.addEventListener('DOMContentLoaded', async () => {
    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const chatMessages = document.getElementById('chatMessages');

    document.getElementById("username-menu").innerHTML = username;

    async function selecionarCanal(canal) {
        canalAtual = canal;

        document.querySelector(".channel-header h4").innerHTML =
            `<span class="hashtag">#</span> ${canal.nome}`;

        messageInput.placeholder =
            `Conversar em #${canal.nome}`;

        chatMessages.innerHTML = "";

        await renderizarHistorico(canal.id);
    }

    await renderizarCanais(selecionarCanal);



    async function renderizarHistorico(chatId) {
        mostrarLoading();
        const historico = await obterHistoricoFormatado(userId, chatId);
        historico.forEach(msg => {
            appendMessage(chatMessages, msg.texto, msg.tipo, msg.nome, msg.data);
        });

        esconderLoading();
    }

    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
        console.log("✅ WebSocket conectado.");
    };

    socket.onmessage = (event) => {
        const resposta = JSON.parse(event.data);

        console.log(resposta);

        const mensagem = resposta.dados;

        if (!canalAtual || mensagem.chat_id !== canalAtual.id) {
            return;
        }
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

        await enviarMensagem(messageText, canalAtual?.id);

        //appendMessage(chatMessages, messageText, 'sent', userName, retornoApi.data_hora);

        messageInput.value = '';
    });

    div.addEventListener("click", async () => {
        document.querySelectorAll(".channel").forEach(c => {
            c.classList.remove("active");
        });

        div.classList.add("active");

        await onSelect(canal);
    });

});