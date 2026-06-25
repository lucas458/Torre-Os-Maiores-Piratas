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
        li.style.animationDelay = `${index * 0.05}s`;

        if(index === 0) li.classList.add("rank-1");
        if(index === 1) li.classList.add("rank-2");
        if(index === 2) li.classList.add("rank-3");

        let medalha = "";

        if(index === 0) medalha = "🥇";
        if(index === 1) medalha = "🥈";
        if(index === 2) medalha = "🥉";

        li.innerHTML = `
            <div class="rank-badge">
                ${medalha ? `<div class="rank-icon">${medalha}</div>` : ''}
                <div class="rank-number">#${index + 1}</div>
            </div>

            <div class="poster-container" onclick="openModal('${jogador.imagem}', '${jogador.nome}')" style="cursor: pointer;">
                <img
                    class="poster"
                    src="${jogador.imagem}"
                    alt="${jogador.nome}"
                    loading="lazy"
                    onerror="this.src='data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22%3E%3Crect width=%22100%22 height=%22100%22 fill=%22%2327272a%22/%3E%3Ctext x=%2250%22 y=%2250%22 font-family=%22Arial%22 font-size=%2214%22 fill=%22%23a1a1aa%22 text-anchor=%22middle%22 dy=%22.3em%22%3E?%3C/text%3E%3C/svg%3E'"
                >
            </div>

            <div class="player-info">
                <div class="player-details">
                    <h2>${jogador.nome}</h2>

                    <div class="bounty">
                        <span class="bounty-label">PONTOS</span>
                        <span class="bounty-value">${jogador.pontos.toLocaleString("pt-BR")} pts</span>
                    </div>
                </div>
                
                ${index === 0 ? `<div class="winner-tag">👑 REI DOS PIRATAS</div>` : ''}
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

function openModal(imgSrc, captionText) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const caption = document.getElementById("modalCaption");
    
    modal.style.display = "block";
    // Forçar reflow para ativar animação CSS
    void modal.offsetWidth;
    modal.classList.add("show");
    
    modalImg.src = imgSrc;
    caption.textContent = captionText;
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("imageModal");
    const closeBtn = document.querySelector(".modal-close");
    
    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }
    
    // Fechar ao clicar fora da imagem
    if (modal) {
        modal.onclick = function(event) {
            if (event.target === modal || event.target.classList.contains("modal-body")) {
                closeModal();
            }
        }
    }
});