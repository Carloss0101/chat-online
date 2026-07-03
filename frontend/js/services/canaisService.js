import { obterCanais } from "../api/api.js";
import {mostrarLoading, esconderLoading} from "./loadingService.js";

export async function renderizarCanais(onSelect) {
    try {
        mostrarLoading();
        const canais = await obterCanais();

        const lista = document.getElementById("channelsList");
        lista.innerHTML = "";

        canais.forEach((canal, index) => {
            const div = document.createElement("div");

            div.className = `channel ${index === 0 ? "active" : ""}`;
            div.dataset.id = canal.id;

            div.innerHTML = `
                <span class="hashtag">#</span>
                ${canal.nome}
            `;

            lista.appendChild(div);

            div.addEventListener("click", async () => {
                document.querySelectorAll(".channel").forEach(c => c.classList.remove("active"));
                div.classList.add("active");
                await onSelect(canal);
            });

            if (index === 0) {
                onSelect(canal);
            }
        });
    } catch (error) {
        console.error("Erro ao renderizar canais:", error);
    } finally {
        esconderLoading();
    }
}