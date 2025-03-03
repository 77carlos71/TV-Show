const config = {
  apiUrl:
    "https://agile-releases.s3.us-east-1.amazonaws.com/tests/episodes/SHOW123.json",
  showApiUrl:
    "https://agile-releases.s3.us-east-1.amazonaws.com/tests/tv-shows/SHOW123.json", // Novo link para pegar os detalhes do show

  newEpisodesForSeason3: [
    {
      Title: "Sombras do Passado",
      Duration: 50,
      EpisodeNumber: 6,
      SeasonNumber: 3,
      Image:
        "https://agile-releases.s3.us-east-1.amazonaws.com/tests/assets/034570233.jpeg",
      Synopsis:
        "Após um estranho encontro, a equipe começa a descobrir segredos ocultos que podem mudar o destino de todos.",
    },
    {
      Title: "A Jornada Sombria",
      Duration: 45,
      EpisodeNumber: 7,
      SeasonNumber: 3,
      Image:
        "https://agile-releases.s3.us-east-1.amazonaws.com/tests/assets/127397234.jpeg",
      Synopsis:
        "Em uma jornada perigosa, eles enfrentam criaturas das sombras e tentam impedir que um antigo mal renasça.",
    },
    {
      Title: "Vingança Sob a Lua Cheia",
      Duration: 52,
      EpisodeNumber: 8,
      SeasonNumber: 3,
      Image:
        "https://agile-releases.s3.us-east-1.amazonaws.com/tests/assets/234u092384.jpeg",
      Synopsis:
        "O passado de alguns membros da equipe vem à tona, e uma vingança antiga ameaça destruir a todos.",
    },
    {
      Title: "O Último Suspiro",
      Duration: 49,
      EpisodeNumber: 9,
      SeasonNumber: 3,
      Image:
        "https://agile-releases.s3.us-east-1.amazonaws.com/tests/assets/90128312349.jpeg",
      Synopsis:
        "A luta final se aproxima. Cada escolha pode ser a última, e o destino da equipe está em jogo.",
    },
  ],
  createEpisodesWith8Episodes: function (episodes) {
    const repeatedEpisodes = [];
    while (repeatedEpisodes.length < 8) {
      repeatedEpisodes.push(...episodes);
    }
    return repeatedEpisodes.slice(0, 8);
  },
};

Promise.all([
  fetch(config.apiUrl).then((response) => response.json()),
  fetch(config.showApiUrl).then((response) => response.json()),
])
  .then(([episodeData, showData]) => {
    const episodes = (episodeData || []).filter((episode) => episode !== null);
    const season1Episodes = config.createEpisodesWith8Episodes(
      episodes.filter((episode) => episode.SeasonNumber === 1)
    );
    const season2Episodes = config.createEpisodesWith8Episodes(
      episodes.filter((episode) => episode.SeasonNumber === 2)
    );
    const season3Episodes = config.createEpisodesWith8Episodes(
      config.newEpisodesForSeason3
    );

    // Pega os gêneros do show
    const genres = showData.Genres
      ? showData.Genres.map((genre) => genre.Title).join(", ")
      : "Gêneros não disponíveis";

    // Verifica se há episódios
    if (
      season1Episodes.length === 0 &&
      season2Episodes.length === 0 &&
      season3Episodes.length === 0
    ) {
      console.log("Nenhum episódio encontrado.");
      return;
    }

    const episodeContainer = document.getElementById("episodes-container");
    episodeContainer.innerHTML = "";

    function createSeason(episodes, seasonNumber) {
      const seasonContainer = document.createElement("div");
      seasonContainer.classList.add("season-container");
      const seasonTitle = document.createElement("h2");
      seasonContainer.appendChild(seasonTitle);

      episodes.forEach((episode) => {
        const listItem = document.createElement("div");
        listItem.classList.add("episode", "font-nunito");
        const playIcon = `
          <svg class="play-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"></circle>
            <polygon points="10 8, 16 12, 10 16" fill="white"></polygon>
          </svg>
        `;

        listItem.innerHTML = `
          <div class="episode-row">
            <div class="episode-title">
              ${episode.EpisodeNumber}&nbsp;&nbsp;&nbsp;${episode.Title}
            </div>
            <div class="episode-title-icon">
              ${playIcon}
            </div>
          </div>
          <div class="episode-details" style="display: none;">
            <img src="${episode.Image}" alt="${episode.Title}" />
            <p><strong>Duração:</strong> ${episode.Duration} minutos</p>
            <p><strong>Número do Episódio:</strong> ${episode.EpisodeNumber}</p>
            <p><strong>Sinopse:</strong> ${
              episode.Synopsis || "Sem descrição disponível."
            }</p>
            <p><strong>Gêneros:</strong> ${genres}</p>
          </div>
        `;
        window.onload = () => {
          // Espera o carregamento completo da página, incluindo o conteúdo dos episódios
          setTimeout(() => {
            const firstEpisodeTitle = document.querySelector(".episode-title");
            const generalButton = document.querySelector("#general");

            if (firstEpisodeTitle && generalButton) {
              // Clica no título do primeiro episódio
              firstEpisodeTitle.click();

              // Clica no botão "GENERAL"
              generalButton.click();
            }
          }, 20); // Aguarda 100ms para garantir que os elementos estejam disponíveis
        };

        let isAlreadyActive = false;

        seasonContainer.appendChild(listItem);
        const episodeTitle = listItem.querySelector(".episode-title");
        const episodeDetails = listItem.querySelector(".episode-details");

        episodeTitle.addEventListener("click", () => {
          // Alterna a visibilidade da sinopse dentro da lista de episódios
          if (episodeDetails.style.display === "block") {
            episodeDetails.style.display = "none";
          } else {
            // Oculta todos os outros episódios antes de exibir o atual
            document.querySelectorAll(".episode-details").forEach((detail) => {
              detail.style.display = "none";
            });

            episodeDetails.style.display = "block";
          }
          listItem.scrollIntoView({ behavior: "smooth", block: "center" });
          // Obtém o contêiner onde será exibida a sinopse e os emojis
          const geralContainer = document.getElementById("geral-container");

          // Verifica se o episódio clicado é o mesmo que o ativo
          if (geralContainer.dataset.activeEpisode === episode.Title) {
            // Se for o mesmo, apenas oculta o contêiner sem limpar o conteúdo
            geralContainer.style.display = "none";
            geralContainer.removeAttribute("data-active-episode");
            return;
          }

          // Se for um episódio diferente, limpa o contêiner e exibe o novo episódio
          geralContainer.innerHTML = ""; // Limpa a exibição geral
          geralContainer.style.display = "flex"; // Exibe o contêiner
          geralContainer.dataset.activeEpisode = episode.Title; // Define o episódio ativo

          const emojiDiv = document.createElement("div");
          emojiDiv.style.display = "flex";
          emojiDiv.style.flexDirection = "row";
          emojiDiv.style.alignItems = "center";
          emojiDiv.style.gap = "30%";
          emojiDiv.style.marginLeft = "5.9%";

          function criarIcone(svg, texto) {
            const container = document.createElement("div");
            container.classList.add("emoji-container");

            const svgElement = new DOMParser().parseFromString(
              svg,
              "image/svg+xml"
            ).documentElement;
            svgElement.classList.add("emoji-icon");

            const label = document.createElement("span");
            label.classList.add("emoji-text");
            label.innerText = texto;

            container.appendChild(svgElement);
            container.appendChild(label);

            return container;
          }
          isAlreadyActive = true;

          // Adiciona os ícones com texto
          emojiDiv.appendChild(
            criarIcone(
              `
    <!-- Ícone de Adicionar (Bolinha com "+") -->
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 8v8"/>
      <path d="M8 12h8"/>
    </svg>
  `,
              "Adicionar"
            )
          );

          emojiDiv.appendChild(
            criarIcone(
              `
    <!-- Ícone Feliz (Sorriso) -->
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8.5 15.5c2 1.5 5 1.5 7 0"/>
      <path d="M9 9h.01"/>
      <path d="M15 9h.01"/>
    </svg>
  `,
              "Feliz"
            )
          );

          emojiDiv.appendChild(
            criarIcone(
              `
    <!-- Ícone de Gravação (Bolinha menor no meio) -->
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="2" fill="white"/>
    </svg>
  `,
              "Gravar"
            )
          );

          emojiDiv.appendChild(
            criarIcone(
              `
    <!-- Ícone de Compartilhar (Seta para cima) -->
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6"/>
      <path d="M16 6l-4-4-4 4"/>
      <path d="M12 2v14"/>
    </svg>
  `,
              "Compartilhar"
            )
          );

          // Função para quebrar a sinopse a cada 10 palavras
          function formatSinopse(text) {
            if (!text) return "Sem descrição disponível.";
            let words = text.split(" ");
            let formattedText = "";

            for (let i = 0; i < words.length; i++) {
              formattedText += words[i] + " ";
              if ((i + 1) % 10 === 0) {
                formattedText += "<br>";
              }
            }

            return formattedText.trim();
          }

          // Cria a div para a sinopse
          const sinopseDiv = document.createElement("div");
          sinopseDiv.style.textAlign = "justify";
          sinopseDiv.style.flexGrow = "1";
          sinopseDiv.style.marginLeft = "18%";
          sinopseDiv.style.width = "50%";
          sinopseDiv.style.maxWidth = "100%";
          sinopseDiv.style.overflow = "auto";
          sinopseDiv.style.fontFamily = "'Nunito', sans-serif";

          // Adiciona "SINOPSE" em negrito e a sinopse formatada abaixo
          sinopseDiv.innerHTML = `<strong style="display: block; text-align: left; font-family: 'Nunito', sans-serif;">SINOPSE</strong> 
                        ${formatSinopse(episode.Synopsis)}`;

          // Limpa o conteúdo do geralContainer e adiciona as novas divs
          geralContainer.innerHTML = "";
          geralContainer.style.display = "flex";
          geralContainer.style.alignItems = "center";
          geralContainer.style.justifyContent = "space-between";
          geralContainer.style.flexWrap = "nowrap";
          geralContainer.appendChild(emojiDiv);
          geralContainer.appendChild(sinopseDiv);

          // Exibe a sinopse na própria lista de episódios
          episodeDetails.style.display = "block";
        });
      });

      return seasonContainer;
    }

    function showSeason(season) {
      episodeContainer.innerHTML = "";
      episodeContainer.appendChild(season);
    }

    const season1 = createSeason(season1Episodes, 1);
    const season2 = createSeason(season2Episodes, 2);
    const season3 = createSeason(season3Episodes, 3);

    showSeason(season1);

    document.getElementById("season1").addEventListener("click", () => {
      showSeason(season1);
      setActiveButton("season1");
    });

    document.getElementById("season2").addEventListener("click", () => {
      showSeason(season2);
      setActiveButton("season2");
    });

    document.getElementById("season3").addEventListener("click", () => {
      showSeason(season3);
      setActiveButton("season3");
    });

    function setActiveButton(activeId) {
      const buttons = document.querySelectorAll(".season-btn");
      buttons.forEach((button) => {
        button.classList.remove("active");
      });
      document.getElementById(activeId).classList.add("active");
    }
  })
  .catch((error) => {
    console.error("Erro ao buscar os dados:", error);
  });

// Seletor dos botões de temporada e da barra de destaque
const seasonButtons = document.querySelectorAll(".season-btn");
const highlightBar = document.getElementById("highlight-bar");

function updateHighlightBar(seasonButton) {
  const buttonRect = seasonButton.getBoundingClientRect();

  // Atualiza a posição e a largura da barra de destaque
  highlightBar.style.left = `${
    buttonRect.left +
    window.scrollX -
    seasonButtons[0].offsetParent.getBoundingClientRect().left
  }px`;
  highlightBar.style.width = `${buttonRect.width}px`;
  highlightBar.classList.add("active"); // Torna a barra visível
}

// Adiciona o evento de clique aos botões
seasonButtons.forEach((button) => {
  button.addEventListener("click", () => {
    seasonButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    updateHighlightBar(button);
  });
});

updateHighlightBar(seasonButtons[0]);

// Funcionalidade para a Seção Elenco
document.getElementById("elenco").addEventListener("click", () => {
  const elencoSection = document.getElementById("elenco-section");
  const premiosSection = document.getElementById("premios-section");
  const geralSection = document.getElementById("geral-section");

  // Esconde as seções de prêmios e geral se estiverem visíveis
  premiosSection.style.display = "none";
  geralSection.style.display = "none";

  // Verifica se a seção já está visível
  if (elencoSection.style.display === "block") {
    return; // Se já está visível, não faz nada (evita esconder no segundo clique)
  }

  // Exibe a seção de elenco
  elencoSection.style.display = "block";

  const apiUrl =
    "https://agile-releases.s3.us-east-1.amazonaws.com/tests/tv-shows/SHOW123.json";

  console.log("Botão ELENCO clicado. Buscando dados da API...");

  if (elencoSection.dataset.loaded) {
    console.log("Elenco já carregado, evitando nova requisição.");
    return;
  }

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao carregar os dados");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Dados recebidos da API:", data);

      if (!data.Cast || data.Cast.length === 0) {
        console.log("Nenhum elenco encontrado.");
        return;
      }

      // Duplica os nomes 4 vezes, para rolar
      const elencoDuplicado = data.Cast.flatMap((person) =>
        Array(4).fill(person.Name)
      );

      // Cria o conteúdo do elenco
      const elencoHtml = `
        <div class="elenco-container" id="elenco-container">
            ${elencoDuplicado
              .map((name) => `<div class="elenco-item">${name}</div>`)
              .join("")}
        </div>
        <!-- Setas de rolagem -->
        <button id="scroll-left-elenco" class="scroll-btn scroll-left">❮</button>
        <button id="scroll-right-elenco" class="scroll-btn scroll-right">❯</button>
      `;

      document.getElementById("elenco-section").innerHTML = elencoHtml;

      console.log("Elenco atualizado na seção Elenco.");

      // Adiciona eventos de rolagem
      document
        .getElementById("scroll-right-elenco")
        .addEventListener("click", () => {
          const elencoContainer = document.getElementById("elenco-container");
          elencoContainer.scrollBy({
            left: 300,
            behavior: "smooth",
          });
        });

      document
        .getElementById("scroll-left-elenco")
        .addEventListener("click", () => {
          const elencoContainer = document.getElementById("elenco-container");
          elencoContainer.scrollBy({
            left: -300,
            behavior: "smooth",
          });
        });
    })
    .catch((error) => {
      console.error("Erro ao buscar dados do elenco:", error);
    });
});

// Funcionalidade para a Seção Prêmios
document.getElementById("premios").addEventListener("click", () => {
  const premiosSection = document.getElementById("premios-section");
  const elencoSection = document.getElementById("elenco-section");
  const geralSection = document.getElementById("geral-section");

  // Esconde outras seções
  elencoSection.style.display = "none";
  geralSection.style.display = "none";

  // Se já está visível, não faz nada (evita sumir no segundo clique)
  if (premiosSection.style.display === "block") {
    return;
  }

  // Exibe a seção de prêmios
  premiosSection.style.display = "block";

  // Evita recarregar os dados se já foram carregados antes
  if (premiosSection.dataset.loaded) {
    console.log("Prêmios já carregados, evitando recriação.");
    return;
  }

  // Dados fictícios para os prêmios
  const premiosData = [
    {
      name: "Melhor Série do Ano",
      year: 2023,
    },
    {
      name: "Melhor Direção",
      year: 2023,
    },
    {
      name: "Melhor Roteiro",
      year: 2023,
    },
    {
      name: "Melhor Atuação Feminina",
      year: 2023,
    },
    {
      name: "Melhor Atuação Masculina",
      year: 2023,
    },
    {
      name: "Prêmio de Melhor Elenco",
      year: 2023,
    },
    {
      name: "Prêmio de Melhor Drama",
      year: 2023,
    },
  ];

  // Cria o conteúdo dos prêmios
  const premiosHtml = `
  <div class="premios-wrapper">
    <div class="premios-container" id="premios-container">
      ${premiosData
        .map(
          (premio) =>
            `<div class="premio-item">${premio.name} - ${premio.year}</div>`
        )
        .join("")}
    </div>
    <!-- Setas de rolagem -->
    <button id="scroll-left-premios" class="scroll-btn scroll-left">❮</button>
    <button id="scroll-right-premios" class="scroll-btn scroll-right">❯</button>
  </div>
`;

  document.getElementById("premios-section").innerHTML = premiosHtml;

  // Rolagem para a seção Prêmios
  const premiosContainer = document.getElementById("premios-container");

  document
    .getElementById("scroll-left-premios")
    .addEventListener("click", () => {
      document.getElementById("premios-container").scrollBy({
        left: -200,
        behavior: "smooth",
      });
    });

  document
    .getElementById("scroll-right-premios")
    .addEventListener("click", () => {
      document.getElementById("premios-container").scrollBy({
        left: 200,
        behavior: "smooth",
      });
    });
});

function showSection(sectionId) {
  const sections = document.querySelectorAll('div[id$="-section"]');
  sections.forEach((section) => {
    section.style.display = "none";
  });

  const sectionToShow = document.getElementById(sectionId);
  if (sectionToShow) {
    sectionToShow.style.display = "block";
  }
}

// Evento de clique para o botão GENERAL
document.getElementById("general").addEventListener("click", () => {
  showSection("geral-section");
  setActiveButton("general");
});

// Função para marcar o botão ativo
function setActiveButton(activeId) {
  const buttons = document.querySelectorAll(".footer-btn");
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
  document.getElementById(activeId).classList.add("active");
}
