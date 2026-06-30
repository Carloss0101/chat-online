document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastroForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;

        try {
            const response = await fetch("/api/auth/cadastro", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    senha
                })
            });

            const data = await response.json();
            const res = document.getElementById('mensagem-resposta')
            if (!response.ok) {
                res.innerHTML = data.mensagem;
                return;
            }

            res.innerHTML = 'Cadastro realizado com sucesso!'


            window.location.href = "/login";

        } catch (error) {
            console.error(error);
            alert("Erro ao cadastrar usuário.");
        }
    });
});