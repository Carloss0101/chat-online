document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
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
            res.innerHTML = 'login feito com sucesso!'

            localStorage.setItem("userId", data.dados.id);
            localStorage.setItem("username", data.dados.username);
            window.location.href = "/";

        } catch (error) {
            console.error(error);
            alert("Erro ao realizar login.");
        }
    });
});