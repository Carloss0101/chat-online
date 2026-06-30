const API_URL = "http://localhost:8080/api/mensagem/";

export async function enviarMensagem(textoMensagem) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ mensagem: textoMensagem, userId: 1 })
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

export async function buscarTodasMensagens() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erro ao buscar histórico");
        console.log(response)
        return await response.json();
    } catch (error) {
        console.error("Erro na API ao buscar mensagens:", error);
        return [];
    }
}