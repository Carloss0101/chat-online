import { obterCanais} from "../services/canaisService.js"

export async function getCanais(req, res) {
    try {
        const canais = await obterCanais();
        if(canais.status != 200) {
            return res.status(canais.status).json(canais.mensagem);
        }

        return res.status(200).json(canais.dados);
    } catch (error) {
        console.error("Ocorreu um erro ao obter os canais: ", error)
        return res.status(500).json("Ocorreu um erro ao obter os canais.");
    }
}