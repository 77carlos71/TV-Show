// Configuração Inicial e Dados Estáticos
const CONFIG = {
  apiUrl: "https://agile-releases.s3.us-east-1.amazonaws.com/tests/episodes/SHOW123.json",
  showApiUrl: "https://agile-releases.s3.us-east-1.amazonaws.com/tests/tv-shows/SHOW123.json",
  newEpisodesForSeason3: [
    { Title: "Sombras do Passado", Duration: 50, EpisodeNumber: 6, SeasonNumber: 3, Image: "https://agile-releases.s3.us-east-1.amazonaws.com/tests/assets/034570233.jpeg", Synopsis: "Após um estranho encontro, a equipe começa a descobrir segredos ocultos que podem mudar o destino de todos." },
    { Title: "A Jornada Sombria", Duration: 45, EpisodeNumber: 7, SeasonNumber: 3, Image: "https://agile-releases.s3.us-east-1.amazonaws.com/tests/assets/127397234.jpeg", Synopsis: "Em uma jornada perigosa, eles enfrentam criaturas das sombras e tentam impedir que um antigo mal renasça." },
    { Title: "Vingança Sob a Lua Cheia", Duration: 52, EpisodeNumber: 8, SeasonNumber: 3, Image: "https://agile-releases.s3.us-east-1.amazonaws.com/tests/assets/234u092384.jpeg", Synopsis: "O passado de alguns membros da equipe vem à tona, e uma vingança antiga ameaça destruir a todos." },
    { Title: "O Último Suspiro", Duration: 49, EpisodeNumber: 9, SeasonNumber: 3, Image: "https://agile-releases.s3.us-east-1.amazonaws.com/tests/assets/90128312349.jpeg", Synopsis: "A luta final se aproxima. Cada escolha pode ser a última, e o destino da equipe está em jogo." },
  ],
};

const PREMIOS_DATA = [
  { name: "Melhor Série do Ano", year: 2023 },
  { name: "Melhor Direção", year: 2023 },
  { name: "Melhor Roteiro", year: 2023 },
  { name: "Melhor Atuação Feminina", year: 2023 },
  { name: "Melhor Atuação Masculina", year: 2023 },
  { name: "Prêmio de Melhor Elenco", year: 2023 },
  { name: "Prêmio de Melhor Drama", year: 2023 },
];

// Funções Auxiliares
const createEpisodesWith8 = (episodes) => {
  const repeated = [];
  while (repeated.length < 8) repeated.push(...episodes);
  return repeated.slice(0, 8);
};

const formatSynopsis = (text) => {
  if (!text) return "Sem descrição disponível.";
  const words = text.split(" ");
  return words.reduce((acc, word, i) => 
    acc + word + " " + ((i + 1) % 10 === 0 ? "<br>" : ""), "").trim();
};

const toggleSection = (sectionId, hideOthers = true) => {
  const sections = document.querySelectorAll('div[id$="-section"]');
  sections.forEach((section) => section.style.display = section.id === sectionId && section.style.display !== "block" ? "block" : "none");
  if (!hideOthers) document.getElementById(sectionId).style.display = "block";
};

const setActiveButton = (activeId, buttonClass = ".season-btn") => {
  document.querySelectorAll(buttonClass).forEach((btn) => btn.classList.remove("active"));
  document.getElementById(activeId).classList.add("active");
};

const updateHighlightBar = (button, highlightBar) => {
  const rect = button.getBoundingClientRect();
  const parentLeft = button.offsetParent.getBoundingClientRect().left;
  highlightBar.style.left = `${rect.left + window.scrollX - parentLeft}px`;
  highlightBar.style.width = `${rect.width}px`;
  highlightBar.classList.add("active");
};

const addScrollListeners = (containerId, leftBtnId, rightBtnId, scrollAmount = 300) => {
  const container = document.getElementById(containerId);
  document.getElementById(leftBtnId).addEventListener("click", () => container.scrollBy({ left: -scrollAmount, behavior: "smooth" }));
  document.getElementById(rightBtnId).addEventListener("click", () => container.scrollBy({ left: scrollAmount, behavior: "smooth" }));
};

// Criação de Temporadas e Episódios
const createSeason = (episodes, seasonNumber, genres) => {
  const container = document.createElement("div");
  container.classList.add("season-container");
  const title = document.createElement("h2");
  container.appendChild(title);

  episodes.forEach((episode) => {
    const item = document.createElement("div");
    item.classList.add("episode", "font-nunito");
    item.innerHTML = `
      <div class="episode-row">
        <div class="episode-title">${episode.EpisodeNumber}   ${episode.Title}</div>
        <div class="episode-title-icon">
          <svg class="play-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"></circle>
            <polygon points="10 8, 16 12, 10 16" fill="white"></polygon>
          </svg>
        </div>
      </div>
      <div class="episode-details" style="display: none;">
        <img src="${episode.Image}" alt="${episode.Title}" />
        <p><strong>Duração:</strong> ${episode.Duration} minutos</p>
        <p><strong>Número do Episódio:</strong> ${episode.EpisodeNumber}</p>
        <p><strong>Sinopse:</strong> ${episode.Synopsis || "Sem descrição disponível."}</p>
        <p><strong>Gêneros:</strong> ${genres}</p>
      </div>
    `;

    const titleElement = item.querySelector(".episode-title");
    const details = item.querySelector(".episode-details");
    titleElement.addEventListener("click", () => {
      document.querySelectorAll(".episode-details").forEach((d) => d.style.display = "none");
      details.style.display = details.style.display === "block" ? "none" : "block";
      item.scrollIntoView({ behavior: "smooth", block: "center" });

      const geralContainer = document.getElementById("geral-container");
      if (geralContainer.dataset.activeEpisode === episode.Title) {
        geralContainer.style.display = "none";
        geralContainer.removeAttribute("data-active-episode");
        return;
      }

      geralContainer.innerHTML = "";
      geralContainer.style.display = "flex";
      geralContainer.dataset.activeEpisode = episode.Title;

      const emojiDiv = document.createElement("div");
      emojiDiv.style.cssText = "display: flex; flex-direction: row; align-items: center; gap: 30%; margin-left: 5.9%;";

      // Ícones usados no Footer
      emojiDiv.innerHTML = `
        <div class="emoji-container">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v8"/>
            <path d="M8 12h8"/>
          </svg>
          <span class="emoji-text">Adicionar</span>
        </div>
        <div class="emoji-container">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8.5 15.5c2 1.5 5 1.5 7 0"/>
            <path d="M9 9h.01"/>
            <path d="M15 9h.01"/>
          </svg>
          <span class="emoji-text">Feliz</span>
        </div>
        <div class="emoji-container">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="2" fill="white"/>
          </svg>
          <span class="emoji-text">Gravar</span>
        </div>
        <div class="emoji-container">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/>
            <path d="M16 6l-4-4-4 4"/>
            <path d="M12 2v14"/>
          </svg>
          <span class="emoji-text">Compartilhar</span>
        </div>
      `;

      const synopsisDiv = document.createElement("div");
      synopsisDiv.style.cssText = "text-align: justify; flex-grow: 1; margin-left: 18%; width: 50%; max-width: 100%; overflow: auto; font-family: 'Nunito', sans-serif;";
      synopsisDiv.innerHTML = `<strong style="display: block; text-align: left; font-family: 'Nunito', sans-serif;">SINOPSE</strong>${formatSynopsis(episode.Synopsis)}`;

      geralContainer.style.cssText = "display: flex; align-items: center; justify-content: space-between; flex-wrap: nowrap;";
      geralContainer.append(emojiDiv, synopsisDiv);
    });

    container.appendChild(item);
  });

  return container;
};

// Lógica Principal
Promise.all([fetch(CONFIG.apiUrl).then((res) => res.json()), fetch(CONFIG.showApiUrl).then((res) => res.json())])
  .then(([episodeData, showData]) => {
    const episodes = (episodeData || []).filter(Boolean);
    const genres = showData.Genres?.map((g) => g.Title).join(", ") || "Gêneros não disponíveis";
    const episodeContainer = document.getElementById("episodes-container");

    const season1Episodes = createEpisodesWith8(episodes.filter((e) => e.SeasonNumber === 1));
    const season2Episodes = createEpisodesWith8(episodes.filter((e) => e.SeasonNumber === 2));
    const season3Episodes = createEpisodesWith8(CONFIG.newEpisodesForSeason3);

    if (!season1Episodes.length && !season2Episodes.length && !season3Episodes.length) {
      console.log("Nenhum episódio encontrado.");
      return;
    }

    const seasons = {
      1: createSeason(season1Episodes, 1, genres),
      2: createSeason(season2Episodes, 2, genres),
      3: createSeason(season3Episodes, 3, genres),
    };

    const showSeason = (seasonNum) => {
      episodeContainer.innerHTML = "";
      episodeContainer.appendChild(seasons[seasonNum]);
    };

    showSeason(1);
    document.getElementById("season1").addEventListener("click", () => { showSeason(1); setActiveButton("season1"); });
    document.getElementById("season2").addEventListener("click", () => { showSeason(2); setActiveButton("season2"); });
    document.getElementById("season3").addEventListener("click", () => { showSeason(3); setActiveButton("season3"); });

    const seasonButtons = document.querySelectorAll(".season-btn");
    const highlightBar = document.getElementById("highlight-bar");
    seasonButtons.forEach((btn) => {
      btn.addEventListener("click", () => updateHighlightBar(btn, highlightBar));
    });
    updateHighlightBar(seasonButtons[0], highlightBar);

    window.onload = () => {
      setTimeout(() => {
        document.querySelector(".episode-title")?.click();
        document.getElementById("general")?.click();
      }, 20);
    };
  })
  .catch((error) => console.error("Erro ao buscar os dados:", error));

// Seções de Elenco e Prêmios
document.getElementById("elenco").addEventListener("click", () => {
  const elencoSection = document.getElementById("elenco-section");
  toggleSection("elenco-section");
  if (elencoSection.dataset.loaded) return;

  fetch(CONFIG.showApiUrl)
    .then((res) => res.json())
    .then((data) => {
      if (!data.Cast?.length) return;
      const castNames = data.Cast.flatMap((person) => Array(4).fill(person.Name));
      elencoSection.innerHTML = `
        <div class="elenco-container" id="elenco-container">${castNames.map((name) => `<div class="elenco-item">${name}</div>`).join("")}</div>
        <button id="scroll-left-elenco" class="scroll-btn scroll-left">❮</button>
        <button id="scroll-right-elenco" class="scroll-btn scroll-right">❯</button>
      `;
      elencoSection.dataset.loaded = true;
      addScrollListeners("elenco-container", "scroll-left-elenco", "scroll-right-elenco");
    })
    .catch((error) => console.error("Erro ao buscar dados do elenco:", error));
});

document.getElementById("premios").addEventListener("click", () => {
  const premiosSection = document.getElementById("premios-section");
  toggleSection("premios-section");
  if (premiosSection.dataset.loaded) return;

  premiosSection.innerHTML = `
    <div class="premios-wrapper">
      <div class="premios-container" id="premios-container">${PREMIOS_DATA.map((p) => `<div class="premio-item">${p.name} - ${p.year}</div>`).join("")}</div>
      <button id="scroll-left-premios" class="scroll-btn scroll-left">❮</button>
      <button id="scroll-right-premios" class="scroll-btn scroll-right">❯</button>
    </div>
  `;
  premiosSection.dataset.loaded = true;
  addScrollListeners("premios-container", "scroll-left-premios", "scroll-right-premios", 200);
});

document.getElementById("general").addEventListener("click", () => {
  toggleSection("geral-section", false);
  setActiveButton("general", ".footer-btn");
});
