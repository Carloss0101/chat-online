const API_URL = "http://localhost:8080/api/";

export async function enviarMensagem(textoMensagem, chat) {
    try {
        const response = await fetch(API_URL + 'mensagem/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mensagem: textoMensagem, chat: chat})
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const json = await response.json();
        console.log("JSON recebido do Back-end:", json); 
        return json;

    } catch (error) {
        console.error("Erro na API ao enviar mensagem:", error);
        return null;
    }
}

export async function buscarTodasMensagens(chatId) {
    try {
        const response = await fetch(API_URL + `mensagem/${chatId}`);
        if (!response.ok) throw new Error("Erro ao buscar histórico");
        return await response.json();
    } catch (error) {
        console.error("Erro na API ao buscar mensagens:", error);
        return [];
    }
}

export async function obterCanais() {
    try {
        const response = await fetch(API_URL + 'canais/');
        if (!response.ok) throw new Error("Erro ao buscar canais");
        console.log(response)
        return await response.json();
    } catch (error) {
        console.error("Erro na API ao obter canais:", error);
        return [];
    }
}