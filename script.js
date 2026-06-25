const jogadores = [
{
    nome: "Edinho",
    pontos: 500000,
    imagem: "images/Edinho.png"
},
{
    nome: "Patrão",
    pontos: 300000,
    imagem: "images/Patrao.jpg"
},
{
    nome: "Arthur Max",
    pontos: 200000,
    imagem: "images/ArthurMax.jpg"
},
{
    nome: "Matheus Japa",
    pontos: 900000,
    imagem: "images/MatheusJapa.png"
},
{
    nome: "Lucão",
    pontos: 300000,
    imagem: "images/Lucao.jpg"
},
{
    nome: "Guedes",
    pontos: 200000,
    imagem: "images/Guedes.jpg"
},
{
    nome: "Felipe Souza",
    pontos: 300000,
    imagem: "images/FelipeSouza.png"
},
{
    nome: "Tixa",
    pontos: 100000,
    imagem: "images/Tixa.jpg"
},
{
    nome: "Luciano",
    pontos: 1500000,
    imagem: "images/Luciano.png"
},
{
    nome: "Gustavo",
    pontos: 300000,
    imagem: "images/Gustavo.jpg"
},
{
    nome: "Pedro Coelho",
    pontos: 200000,
    imagem: "images/PedroCoelho.jpg"
},
{
    nome: "Mark",
    pontos: 700000,
    imagem: "images/Mark.jpg"
},
];

// Eventos
document.getElementById("search").addEventListener("input", exibirRankingFiltrado);
document.getElementById("sort").addEventListener("change", exibirRankingFiltrado);

function exibirRankingFiltrado() {

    let filtrados = [...jogadores];

    // Busca
    const busca = document
        .getElementById("search")
        .value
        .toLowerCase();

    if (busca) {
        filtrados = filtrados.filter(j =>
            j.nome.toLowerCase().includes(busca)
        );
    }

    // Ordenação
    const ordem = document.getElementById("sort").value;

    filtrados.sort((a, b) =>
        ordem === "desc"
            ? b.pontos - a.pontos
            : a.pontos - b.pontos
    );

    const list = document.getElementById("ranking-list");

    list.innerHTML = "";

    filtrados.forEach((jogador, index) => {

        const li = document.createElement("li");

        li.classList.add("player-card");

        if(index === 0) li.classList.add("rank-1");
        if(index === 1) li.classList.add("rank-2");
        if(index === 2) li.classList.add("rank-3");

        let medalha = `#${index + 1}`;

        if(index === 0) medalha = "🥇";
        if(index === 1) medalha = "🥈";
        if(index === 2) medalha = "🥉";

        li.innerHTML = `
            <div class="rank-badge">
                ${medalha}
            </div>

            <img
                class="poster"
                src="${jogador.imagem}"
                alt="${jogador.nome}"
                loading="lazy"
            >

            <div class="player-info">
                <h2>${jogador.nome}</h2>

                <p>
                    🏆 ${jogador.pontos.toLocaleString("pt-BR")} pontos
                </p>
            </div>
        `;

        list.appendChild(li);
    });

    atualizarEstatisticas();
}

function atualizarEstatisticas() {

    const ordenados = [...jogadores]
        .sort((a, b) => b.pontos - a.pontos);

    document.getElementById("totalPlayers").textContent =
        jogadores.length;

    document.getElementById("leaderName").textContent =
        ordenados[0].nome;

    document.getElementById("leaderPoints").textContent =
        ordenados[0].pontos.toLocaleString("pt-BR");
}

exibirRankingFiltrado();