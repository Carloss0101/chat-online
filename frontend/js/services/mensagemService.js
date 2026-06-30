import { buscarTodasMensagens } from "../api/mensagemApi.js"

function formatarDataMensagem(dataString) {
  const data = new Date(dataString);
  const agora = new Date();

  const hoje = new Date(
    agora.getFullYear(),
    agora.getMonth(),
    agora.getDate()
  );

  const dataMensagem = new Date(
    data.getFullYear(),
    data.getMonth(),
    data.getDate()
  );

  const diffDias = Math.floor(
    (hoje - dataMensagem) / (1000 * 60 * 60 * 24)
  );

  if (diffDias === 0) {
    return data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (diffDias === 1) {
    return "há 1 dia";
  }

  if (diffDias <= 7) {
    return `há ${diffDias} dias`;
  }

  return data.toLocaleDateString("pt-BR");
}

export function appendMessage(container, text, type, username, data) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('message-wrapper', type);

    const avatarClass = type === 'sent' ? 'avatar user-avatar' : 'avatar';

    const htmlContent = `
        ${type === 'received' ? `<div class="${avatarClass}"></div>` : ''}
        <div class="message-content">
            <div class="message-info">
                <span class="username">${username}</span>
                <span class="timestamp">${formatarDataMensagem(data)}</span>
            </div>
            <p class="text">${text}</p>
        </div>
        ${type === 'sent' ? `<div class="${avatarClass}"></div>` : ''}
    `;

    wrapper.innerHTML = htmlContent;
    container.appendChild(wrapper);
    container.scrollTop = container.scrollHeight;
}

export async function obterHistoricoFormatado(userId) {
    const resposta = await buscarTodasMensagens();
    const historico = Array.isArray(resposta) ? resposta : (resposta?.dados || []);

    return historico.map(msg => {
        const ehUsuarioAtual = msg.user_id == userId;
        return {
            texto: msg.mensagem,
            tipo: ehUsuarioAtual ? 'sent' : 'received',
            nome: msg.usuario.username,
            data: msg.data_hora
        };
    });
}